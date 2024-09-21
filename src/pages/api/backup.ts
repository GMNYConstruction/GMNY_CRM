import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { getTokenAuth } from "./getTokenAuth";
import { mkConfig, generateCsv, asString } from "export-to-csv";
import { writeFile, } from "node:fs";
import fs from 'fs';
import { Buffer } from "node:buffer";
import { google } from "googleapis"
import apikeys from "../../../apikey.json"
import { resolve } from "node:path";
import { MIMEType } from "node:util";
import { json } from "node:stream/consumers";
import { comments } from "@prisma/client";
import { AccidentsCSV, CommentType } from "@/types";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// const SCOPE = ['https://www.googleapis.com/auth/drive'];

// async function authorize(){
//     const jwtClient = new google.auth.JWT(
//         apikeys.client_email,
//         null as any,
//         apikeys.private_key,
//         SCOPE
//     );
//     await jwtClient.authorize();
//     return jwtClient;
// }

// async function uploadFile(authClient: any){
//     return new Promise((resolve,rejected)=>{
//         const drive = google.drive({version:'v3',auth:authClient}); 
//         var fileMetaData = {
//             name:'comments.csv',    
//             parents:['1oCXqWP4QSK-T4HMDoCBRJtAcv6VdHUMx'] // A folder ID to which file will get uploaded
//         }
//         drive.files.create({
//             resource:fileMetaData,
//             media:{
//                 body: fs.createReadStream('comments.csv'), // files that will get uploaded
//                 mimeType:'*/*'
//             },
//             fields:'id'
//         } as any,function(error: any,file: any){
//             if(error){
//                 return rejected(error)
//             }
//             resolve(file);
//         })
//     });
// }


const BackUp = async (req: NextApiRequest, res: NextApiResponse) => {
 
 if(req.method !== "GET") return res.status(400).json({message: "Wrong Method"})

 const csvConfig = mkConfig({ useKeysAsHeaders: true }); 

 try{
    const response = await prisma.$transaction([
      prisma.accidents.findMany({
        select:{
              id:true,
              name:true,                
              report:true,              
              efroi:true,               
              witness:true,             
              correspondence:true,      
              notice:true,              
              accidentDescription:true, 
              assignedToCompany:true,   
              backToWork:true,          
              dateOfAccident:true,      
              documentFolder:true,      
              firstCheck:true,          
              lastCheck:true,           
              lastDayOfWork:true,       
              companyWeWorkedFor:true,   
              lastModified:false,         
              accidentLocation:true,
        }
      }), 
      prisma.comments.findMany(), 
      prisma.users.findMany()
    ])     

 

    const csv = generateCsv(csvConfig)(response[0]);
    const filename = `comments.csv`;
    const csvBuffer = new Uint8Array(Buffer.from(asString(csv)));

    writeFile(filename, csvBuffer, (err) => {
        if (err) throw err;
        console.log("file saved: ", 'comments.csv');
    });
    
    // authorize().then(uploadFile).catch()


    
    return res.status(200).json({message: 'Back up succesful' })
 }
 catch(err) {
    return res.status(400).json({message: "Error occured", error: err})
 }
 

};

export default BackUp;