import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { json } from "stream/consumers";
 

const UpdateUserStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

  const data = req.body;

  if (!data || !data.id) return res.status(400).json({message: "Data Is Missing!"})

 try{
  await prisma.users.update({
    where: {
      id: data.id,
    },
    data: {
        status: data.status
    },
  })
    return res.status(200).json({message: "User Updated Successfuly!"});

 }
 catch(err) {
    console.log(err)
    return res.status(400).json({message: "Error occured", error: err})
 }

 
};

export default UpdateUserStatus;