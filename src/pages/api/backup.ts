import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma"; 
import { mkConfig, generateCsv, asString } from "export-to-csv"; 
import { Buffer } from "node:buffer";   
import { Readable } from "stream"; 
import { getGoogleDrive } from "./google";

export const dynamic = 'force-dynamic';
 
const uploadFile = async (file: any, name = 'name missing' ) => {
   const drive = await getGoogleDrive();
     
   return drive.files.create({
        requestBody: {
            name: name,    
            mimeType: "text/csv",
            parents:[`${process.env.BACKUP_FOLDER_ID}`]
        },
        media:{
            body: file,  
            mimeType:'text/csv'
        },
        fields:'id'
    }).catch((err)=> {throw new Error(err)})
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
 
 if(req.method !== "GET") return res.status(400).json({message: "Wrong Method"})

 const csvConfig = mkConfig({ useKeysAsHeaders: true }); 

 try{
    const response = await prisma.$transaction([
      prisma.accidents.findMany(), 
      prisma.comments.findMany(), 
      prisma.users.findMany(),
      prisma.contracts.findMany()
    ])     

    const accidents = response[0].map((accident)=> ({...accident, lastModified: accident.lastModified?.toISOString()}))
    const comments = response[1].map((comment)=> ({...comment, dateCreated: comment.dateCreated?.toISOString()}))
     
    const csvComments = Readable.from(Buffer.from(asString(generateCsv(csvConfig)(comments))));
    const csvUsers = Readable.from(Buffer.from(asString(generateCsv(csvConfig)(response[2]))));
    const csvAccidents = Readable.from(Buffer.from(asString(generateCsv(csvConfig)(accidents))));
    const csvContracts = Readable.from(Buffer.from(asString(generateCsv(csvConfig)(response[3]))));

    const date = new Date()
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
    
    await uploadFile(csvUsers, `users ${formattedDate}`).catch((err)=> res.status(400).json({message: 'Error occured', err: err}))
    await uploadFile(csvComments, `comments ${formattedDate}`).catch((err)=> res.status(400).json({message: 'Error occured', err: err}))
    await uploadFile(csvAccidents, `accidents ${formattedDate}`).catch((err)=> res.status(400).json({message: 'Error occured', err: err}))
    await uploadFile(csvContracts, `contracts ${formattedDate}`).catch((err)=> res.status(400).json({message: 'Error occured', err: err}))

    return res.status(200).json({message: 'Back up succesful'})
 }
 catch(err) {
    console.log(err)
    return res.status(400).json({message: "Error occured", error: err})
 }
 

};
