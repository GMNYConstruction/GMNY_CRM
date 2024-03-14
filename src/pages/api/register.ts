import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { hash } from "bcrypt-ts";

const ChangePass = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

 const data = req.body;
 console.log(data)
 const hashedPassword = await hash(data.password, 10);

 try{
   await prisma.users.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            accessLvl: data.accessLvl
        }
    })
 }
 catch(err) {
    return res.status(400).json({message: "Error occured", error: err})
 }

 return res.status(201).json({message: "User created"})

};

export default ChangePass;