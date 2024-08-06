import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { PrismaClient, Prisma } from '@prisma/client';
import { getTokenAuth } from "./getTokenAuth";
 

const GetCurrentAccident = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

  !await getTokenAuth(req) && res.status(401).json({message: "You must be signed in!"});
  
  if (!data || !data.id) return res.status(400).json({ message: "Wrong Method" });


 try{
    const response = await prisma.accidents.findFirst({
        where: {
            id: Number(data?.id)
        },
        include: {
          comments: {
            select: {
              caseid: true,
              comment: true,
              dateCreated: true,
              userid: true,
              id: true,
            },
            orderBy: {
              dateCreated: "desc"
            }
          }
        }
      })
   
    return res.status(200).json(response);
 }
 catch(err) {
    return res.status(400).json({message: "Error occured", error: err})
 }

 
};

export default GetCurrentAccident;
