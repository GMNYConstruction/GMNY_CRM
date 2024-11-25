import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { mkConfig, generateCsv, asString } from "export-to-csv";
import { Buffer } from "node:buffer";
import { Readable } from "stream";
import { getGoogleDrive } from "./google";
import fs from "fs";
import path from "path";

const BACKUP_FILE_IDS_PATH = "./backupFileIds.json";

// Helper to ensure the JSON file and its directory exist
const ensureBackupFileExists = () => {
    const directoryPath = path.dirname(BACKUP_FILE_IDS_PATH);

    // Ensure the directory exists
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true }); // Create the directory
    }

    // Ensure the file exists
    if (!fs.existsSync(BACKUP_FILE_IDS_PATH)) {
        fs.writeFileSync(BACKUP_FILE_IDS_PATH, JSON.stringify({}, null, 2)); // Create an empty JSON file
    }
};

// Helper to read the JSON file
const readBackupFileIds = (): Record<string, string> => {
    ensureBackupFileExists(); // Ensure the file exists before reading
    return JSON.parse(fs.readFileSync(BACKUP_FILE_IDS_PATH, "utf-8"));
};

// Helper to write to the JSON file
const writeBackupFileIds = (fileIds: Record<string, string>) => {
    ensureBackupFileExists(); // Ensure the file exists before writing
    fs.writeFileSync(BACKUP_FILE_IDS_PATH, JSON.stringify(fileIds, null, 2));
};

// Function to upload or update a file
const uploadOrUpdateFile = async (file: any, name: string) => {
    const drive = await getGoogleDrive();
    const fileIds = readBackupFileIds();
    const tableName = name.split(" ")[0]
    let fileId = fileIds[tableName];

    //if file exists just procced with update
    const isFileExist = await drive.files.get({fileId}).catch(()=> false)

    if (fileIds[tableName] && isFileExist) {
        // Update existing file
        return drive.files.update({
            fileId: fileIds[tableName],
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

        // Save the new file ID to the JSON file
        fileIds[tableName] = response.data.id as any;
        writeBackupFileIds(fileIds);

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

        await uploadOrUpdateFile(csvUsers, `users ${formattedDate}`).catch((err) => res.status(400).json({ message: "Error occurred", err: err }));
        await uploadOrUpdateFile(csvComments, `comments ${formattedDate}`).catch((err) => res.status(400).json({ message: "Error occurred", err: err }));
        await uploadOrUpdateFile(csvAccidents, `accidents ${formattedDate}`).catch((err) => res.status(400).json({ message: "Error occurred", err: err }));
        await uploadOrUpdateFile(csvContracts, `contracts ${formattedDate}`).catch((err) => res.status(400).json({ message: "Error occurred", err: err }));

        return res.status(200).json({ message: "Backup successful" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error occurred", error: err });
    }
};
