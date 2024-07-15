import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { PrismaClient, Prisma } from '@prisma/client';
import { getTokenAuth } from "./getTokenAuth";
import { equal } from "assert";
import { compareSync } from "bcrypt-ts";
 

const GetAllAccidents = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

  !await getTokenAuth(req) && res.status(401).json({message: "You must be signed in!"});
  
  if(!data || !data?.page || !data?.pageSize) return res.status(400).json({ message: "Wrong Method" });

  let pageFetch = data?.page === 0 ? 0 :(data.page - 1)*data?.pageSize; 

  const searchVariants = [] as any[]
  const searchTerms = data?.search?.trim()?.split(' ')
  searchTerms?.map((term: string) => (
    searchVariants.push(
      { name: { contains: term.toLowerCase(), mode:'insensitive' } },
      { assignedToCompany: { contains: term.toLowerCase(), mode:'insensitive' } },
      { companyWeWorkedFor: { contains: term.toLowerCase(), mode:'insensitive' } },
      ) 
    ))


 try{
  const where: Prisma.accidentsWhereInput = {
    OR: searchVariants,
    AND: data?.date ? {dateOfAccident: {contains: data?.date.toString(), mode:'insensitive'}} : {} 
  };

    const relevanceSQL = searchTerms.map((term: string) => `
    (CASE
      WHEN name ILIKE '%${term}%' THEN 1 ELSE 0 END) +
    (CASE
      WHEN "assignedToCompany" ILIKE '%${term}%' THEN 1 ELSE 0 END) + 
    (CASE
      WHEN "companyWeWorkedFor" ILIKE '%${term}%' THEN 1 ELSE 0 END)
  `).join(' + ');

    const rawQuery = `
    SELECT id,name,"assignedToCompany","companyWeWorkedFor", "dateOfAccident","documentFolder", "accidentDescription", (${relevanceSQL}) AS relevance
    FROM accidents
    WHERE ${searchTerms.map((term: string) => `
      (name ILIKE '%${term}%' OR "assignedToCompany" ILIKE '%${term}%' OR "companyWeWorkedFor" ILIKE '%${term}%')
    `).join(' OR ')} ${data?.date && `AND ("dateOfAccident" ILIKE '%${data?.date}%')`} 
    ORDER BY relevance DESC, "lastModified" DESC
    LIMIT ${data?.pageSize} OFFSET ${pageFetch}
  `;

    const response = await prisma.$transaction([
      prisma.accidents.count({
        where,
      }), 
      prisma.$queryRawUnsafe(rawQuery)
    ])     

    return res.json({accidents: response[1], pages: Math.ceil(Number(response[0])/data?.pageSize), });
 }
 catch(err) {
    return res.status(400).json({message: "Error occured", error: err})
 }

 
};

export default GetAllAccidents;
