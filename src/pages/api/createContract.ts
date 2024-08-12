import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { hash } from "bcrypt-ts";
import { getTokenAuth } from "./getTokenAuth";

const CreateContract = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

 const data = req.body; 
 
 const token = await getTokenAuth(req) as any;
 
 if (token === false) res.status(401).json({message: "You must be signed in!"}); 

 if (!data || !data?.from_company || !data?.to_company || !data?.link) return res.status(400).json({message: "Data Is Missing!"})
 
 try{
   const result = await prisma.contracts.create({
        data: {
            from_company: data?.from_company,
            to_company: data?.to_company,
            from_date: data?.from_date,
            to_date: data?.to_date,
            link: data?.link
        }
    })
     return res.status(201).json({message: "Contract saved!", contract: result })
 }
 catch(err) {
    return res.status(400).json({message: "Error occured", error: err})
   
 }



};

export default CreateContract;