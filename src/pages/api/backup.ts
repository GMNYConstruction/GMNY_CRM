import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma"; 
import { mkConfig, generateCsv, asString, asBlob } from "export-to-csv"; 
import { Buffer } from "node:buffer";   
import { Readable } from "stream"; 
import { getGoogleDrive } from "./google";
 
const uploadFile = async (file: any, name = 'test.csv' ) => {
    const drive = await getGoogleDrive();
     
    drive.files.create({
        requestBody: {
            name: name,    
            mimeType: "text/csv",
            parents:['1oCXqWP4QSK-T4HMDoCBRJtAcv6VdHUMx']
        },
        media:{
            body: file,  
            mimeType:'text/csv'
        },
        fields:'id'
    }).then((res)=> console.log(res.data.id))
}

const BackUp = async (req: NextApiRequest, res: NextApiResponse) => {
 
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
    
    uploadFile(csvAccidents, `accidents ${formattedDate}.csv`)
    uploadFile(csvComments, `comments ${formattedDate}.csv`)
    uploadFile(csvUsers, `users ${formattedDate}.csv`)
    uploadFile(csvContracts, `contracts ${formattedDate}.csv`)

    return res.status(200).json({message: 'Back up succesful' })
 }
 catch(err) {
    return res.status(400).json({message: "Error occured", error: err})
 }
 

};

export default BackUp;