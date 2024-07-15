import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { hash } from "bcrypt-ts";
import { getTokenAuth } from "./getTokenAuth";

const CreateAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

 const data = req.body; 
 
 const token = await getTokenAuth(req) as any;
 
 if (token === false) res.status(401).json({message: "You must be signed in!"});
 else if(token?.accessLvl.toLowerCase() !== 'admin') res.status(401).json({message: "You can't perform this action!"});

 console.log(data)

 if (!data || !data.name || !data.email || !data.password || !data.accessLvl || !data.status) return res.status(400).json({message: "Data Is Missing!"})

 const hashedPassword = await hash(data.password, 10);

 
 try{
   const result = await prisma.users.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            accessLvl: data.accessLvl,
            status: data.status,
        },
        select:{
          name: true,
          id: true,
          accessLvl: true,
          status: true,
          email: true,
        }
    })
     return res.status(201).json({message: "User Created!", admin: result })
 }
 catch(err) {
    return res.status(400).json({message: "Error occured", error: err})
   
 }



};

export default CreateAdmin;