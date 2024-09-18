import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { getTokenAuth } from "./getTokenAuth";

const BackUp = async (req: NextApiRequest, res: NextApiResponse) => {
 
 if(req.method !== "GET") return res.status(400).json({message: "Wrong Method"})

 try{
    const response = await prisma.$transaction([
      prisma.accidents.findMany({}), 
      prisma.comments.findMany({}), 
      prisma.users.findMany({}) 
    ])     

    
    return res.status(200).json({message: 'Back up succesful' })
 }
 catch(err) {
    return res.status(400).json({message: "Error occured", error: err})
 }
 

};

export default BackUp;