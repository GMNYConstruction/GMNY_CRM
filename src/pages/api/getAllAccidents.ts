import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
 

const getAllAccidents = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

 try{
    const response = await prisma.accidents.findMany({});
    return res.json(response);
 }
 catch(err) {
    return res.status(400).json({message: "Error occured", error: err})
 }

 
};

export default getAllAccidents;