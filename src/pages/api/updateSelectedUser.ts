import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { getTokenAuth } from "./getTokenAuth";
 

const UpdateSelectedUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

  !await getTokenAuth(req) && res.status(401).json({message: "You must be signed in!"})

  const data = req.body;


  if (!data || !data.id || !data.name || !data.email || !data.accessLvl) return res.status(400).json({message: "Data Is Missing!"})

 try{
  await prisma.users.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      email: data.email,
      accessLvl: data.accessLvl,
    },
  })
    return res.status(200).json({message: "User Updated Successfuly!"});

 }
 catch(err) {
    console.log(err)
    return res.status(400).json({message: "Error occured", error: err})
 }

 
};

export default UpdateSelectedUser;