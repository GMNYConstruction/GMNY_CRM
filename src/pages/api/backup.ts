import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { mkConfig, generateCsv, asString } from "export-to-csv";
import { Buffer } from "node:buffer";
import { Readable } from "stream";
import { getGoogleDrive } from "./google";

const readBackupFileIds = async () => {
    const backup = await prisma.backups.findFirst(); // Fetch the first (or only) row
    if (!backup) {
        // If no row exists, initialize one
        return await prisma.backups.create({
            data: {
                accidents: "",
                comments: "",
                users: "",
                contracts: "",
            },
        });
    }
    return backup;
};

const writeBackupFileId = async (column: string, fileId: string) => {
    await prisma.backups.updateMany({
        data: { [column]: fileId },
    });
};

// Function to upload or update a file
const uploadOrUpdateFile = async (file: any, name: string, backup: any) => {
    const drive = await getGoogleDrive();
    const columnName = name.split(" ")[0] as "comments" || "users" || "accidents" || "contracts"
    const isFileExist = await drive.files.get(backup[columnName]).catch(()=> false)
  
    if (backup[columnName] && isFileExist) {
        // Update existing file
        return drive.files.update({
            fileId: backup[columnName],
            requestBody:{
                name,
            },
            media: {
                body: file,
                mimeType: "text/csv",
            },
        }).catch((err) => { throw new Error(err); });
    } else {
        // Create a new file
        const response = await drive.files.create({
            requestBody: {
                name: name,
                mimeType: "text/csv",
                parents: [`${process.env.BACKUP_FOLDER_ID}`],
            },
            media: {
                body: file,
                mimeType: "text/csv",
            },
            fields: "id",
        }).catch((err) => { throw new Error(err); });

        // Save the new file ID to the table
        const fileId = response.data.id as string;

        writeBackupFileId(columnName, fileId).catch((err)=> err)

        return response;
    }
};

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(400).json({ message: "Wrong Method" });

    const csvConfig = mkConfig({ useKeysAsHeaders: true });

    try {
        const response = await prisma.$transaction([
            prisma.accidents.findMany(),
            prisma.comments.findMany(),
            prisma.users.findMany(),
            prisma.contracts.findMany(),
        ]);

        const accidents = response[0].map((accident) => ({ ...accident, lastModified: accident.lastModified?.toISOString() }));
        const comments = response[1].map((comment) => ({ ...comment, dateCreated: comment.dateCreated?.toISOString() }));

        const csvComments = Readable.from(Buffer.from(asString(generateCsv(csvConfig)(comments))));
        const csvUsers = Readable.from(Buffer.from(asString(generateCsv(csvConfig)(response[2]))));
        const csvAccidents = Readable.from(Buffer.from(asString(generateCsv(csvConfig)(accidents))));
        const csvContracts = Readable.from(Buffer.from(asString(generateCsv(csvConfig)(response[3]))));

        const date = new Date();
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date.getFullYear()}`;
        const backupIds= await readBackupFileIds();

        await uploadOrUpdateFile(csvUsers, `users ${formattedDate}`, backupIds).catch((err) => res.status(400).json({ message: "Error occurred", err: err }));
        await uploadOrUpdateFile(csvComments, `comments ${formattedDate}`,backupIds).catch((err) => res.status(400).json({ message: "Error occurred", err: err }));
        await uploadOrUpdateFile(csvAccidents, `accidents ${formattedDate}`,backupIds).catch((err) => res.status(400).json({ message: "Error occurred", err: err }));
        await uploadOrUpdateFile(csvContracts, `contracts ${formattedDate}`,backupIds).catch((err) => res.status(400).json({ message: "Error occurred", err: err }));

        return res.status(200).json({ message: "Backup successful" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error occurred", error: err });
    }
};
