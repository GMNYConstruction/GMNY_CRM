import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { getTokenAuth } from "./getTokenAuth";

const GetAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }
  
  if (!data|| !data?.id) return res.status(401).json({message: "ID not found"})

  !await getTokenAuth(req) && res.status(401).json({message: "You must be signed in!"})

 try{
    const response = await prisma.users.findMany({
      where: {
        id: {not: data?.id}
      },
       select: {
         id: true,
         email: true,
         name: true,
         accessLvl: true,
         password: false,
         status: true,
  },
    });
    return res.json(response);
 }
 catch(err) {
    console.log(err)
    return res.status(400).json({message: "Error occured", error: err})
 }

 
};

export default GetAllUsers;