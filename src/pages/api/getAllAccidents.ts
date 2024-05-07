import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
 

const GetAllAccidents = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

 try{
    const response = await prisma.accidents.findMany({
      orderBy: {
        lastModified: "desc",
      },
    });
    return res.json(response);
 }
 catch(err) {
    console.log(err)
    return res.status(400).json({message: "Error occured", error: err})
 }

 
};

export default GetAllAccidents;