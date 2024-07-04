import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { PrismaClient, Prisma } from '@prisma/client';
import { getTokenAuth } from "./getTokenAuth";
import { equal } from "assert";
 

const GetAllAccidents = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

  !await getTokenAuth(req) && res.status(401).json({message: "You must be signed in!"});
  
  if(!data || !data.page) return res.status(400).json({ message: "Wrong Method" });

  let pageFetch
  if(data.page <= 0) { 
    pageFetch = 0
  } else pageFetch = (data.page - 1)*10;

  const searchVariants = [] as any[]
  data?.search?.split(' ')?.map((term: string) => (
    searchVariants.push(
      { name: { contains: term.toLowerCase(), mode:'insensitive' } },
      { assignedToCompany: { contains: term.toLowerCase(), mode:'insensitive' } },
      { companyWeWorkedFor: { contains: term.toLowerCase(), mode:'insensitive' } },
      ) 
    ))

 try{
  const where: Prisma.accidentsWhereInput = {
    OR: searchVariants,
    AND: data?.date ? {dateOfAccident: data?.date.toString()} : {}
  };


    const response = await prisma.$transaction([
      prisma.accidents.count({
        where
      }),
      prisma.accidents.findMany({
        where,
        orderBy: {
          lastModified: 'desc'
        },
        skip: pageFetch,
        take: 10,
        include: {
          comments: {
            select: {
              caseid: true,
              comment: true,
              dateCreated: true,
              userid: true,
              id: true,
            }
          }
        }
      })
    ])
    return res.json({accidents: response[1], pages: Math.ceil(Number(response[0])/10), });
 }
 catch(err) {
    return res.status(400).json({message: "Error occured", error: err})
 }

 
};

export default GetAllAccidents;
