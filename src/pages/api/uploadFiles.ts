import type { NextApiRequest, NextApiResponse } from "next"; 
import { getGoogleDrive } from "./google"; 
import { IncomingForm } from "formidable";
import { createReadStream } from "fs";

export const config = {
    api: {
        bodyParser: false, // Disable the default body parser
    },
};


const upload = async (file: any, directory: string) => {
   const drive = await getGoogleDrive();

   return drive.files.create({
       requestBody: {
           name: file?.originalFilename,    
           mimeType: file?.mimeType,
           parents: [directory]
       },
       media: {
           body: createReadStream(file?.filepath),
       },
       fields: 'id'
   }).catch((err) => { throw new Error(err) });
};

const uploadFiles = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return res.status(400).json({ message: "Wrong Method" });

    // Using formidable to parse the form data
   const form = new IncomingForm({
        maxFileSize: 1000 * 1024 * 1024, // Set max file size to 1000MB
        maxFieldsSize: 10 * 1024 * 1024 // Set max fields size to 10MB 
    });
    
    // Parse the incoming request
    form.parse(req, async (err:any, fields:any, files:any) => {
        if (err) {
            console.error("Error parsing the files:", err);
            return res.status(500).json({ message: "Error parsing the files" });
        }

        // get files and directory from parsed data
        const directory = fields?.directory[0]; // Assuming the directory is sent as a regular field
        const uploadedFiles = Object.values(files); // Get the uploaded files

        if (!uploadedFiles.length || !directory) {
            return res.status(400).json({ message: "No files provided or directory missing" });
        }

        const savedFiles = uploadedFiles[0] as any[];

        try {
            const uploadPromises = savedFiles?.map((file: any) => upload(file, directory));
            const results = await Promise.all(uploadPromises);

            return res.status(200).json({ message: "Files uploaded", fileIds: results.map(res => res?.data?.id) });
        } catch (error) {
            console.error("Error uploading files:", error);
            return res.status(500).json({ message: "Error uploading files", error });
        }
    });
};

export default uploadFiles;
