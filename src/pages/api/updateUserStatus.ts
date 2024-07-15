import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { getTokenAuth } from "./getTokenAuth";
 

const UpdateUserStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

 const token = await getTokenAuth(req) as any;
 
 if (token === false) res.status(401).json({message: "You must be signed in!"});
 else if(token?.accessLvl.toLowerCase() !== 'admin') res.status(401).json({message: "You can't perform this action!"});

  const data = req.body;

  if (!data || !data.id) return res.status(400).json({message: "Data Is Missing!"})

 try{
  const result = await prisma.users.update({
    where: {
      id: data.id,
    },
    data: {
        status: data.status
    },
    select: {
      name: true,
      status: true,
      id: true,
      accessLvl: true,
      email: true,
    }
  })
    return res.status(200).json({message: "User Updated Successfuly!", admin: result});

 }
 catch(err) {
    console.log(err)
    return res.status(400).json({message: "Error occured", error: err})
 }

 
};

export default UpdateUserStatus;