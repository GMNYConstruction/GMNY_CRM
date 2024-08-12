import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma"; 
import { getTokenAuth } from "./getTokenAuth";

const DeleteContract = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

  !await getTokenAuth(req) && res.status(401).json({message: "You must be signed in!"})

 const data = req.body; 

 if(!data || !data.id) {
  return res.status(400).json({message: "Data is missing"});
 }
 
 try{
   const response = await prisma.contracts.delete({
    where:{
        id: Number(data?.id), 
    }
   })

   return res.status(200).json({message: "Contract deleted!", id: response?.id});
 }
 catch(err) {
    return res.status(400).json({message: "Error occured", error: err});
 } 

};

export default DeleteContract;