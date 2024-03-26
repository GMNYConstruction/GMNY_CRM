import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { hash } from "bcrypt-ts";

const CreateAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

 const data = req.body; 

 if (!data || !data.name || !data.email || !data.password || !data.accessLvl) return res.status(400).json({message: "Data Is Missing!"})

 const hashedPassword = await hash(data.password, 10);

 try{
   const result = await prisma.users.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            accessLvl: data.accessLvl
        }
    })
     return res.status(201).json({message: "User Created!", admin: result })
 }
 catch(err) {
    return res.status(400).json({message: "Error occured", error: err})
   
 }



};

export default CreateAdmin;