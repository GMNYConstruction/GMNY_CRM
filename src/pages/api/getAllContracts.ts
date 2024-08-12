import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { Prisma } from '@prisma/client';
import { getTokenAuth } from "./getTokenAuth"; 
 

const GetAllContracts = async (req: NextApiRequest, res: NextApiResponse) => {
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
      { from_company: { contains: term.toLowerCase(), mode:'insensitive' } },
      { to_company: { contains: term.toLowerCase(), mode:'insensitive' } },
      ) 
    ))


 try{
  const where: Prisma.contractsWhereInput = {
    OR: searchVariants,
    AND: [{from_date: {contains: data?.from_date?.toString(), mode:'insensitive'}},{to_date: {contains: data?.to_date?.toString(), mode:'insensitive'}}] 
  };

    const relevanceSQL = searchTerms.map((term: string) => `
    (CASE
      WHEN "from_company" ILIKE '%${term}%' THEN 1 ELSE 0 END) +
    (CASE
      WHEN "to_company" ILIKE '%${term}%' THEN 1 ELSE 0 END)
  `).join(' + ');

    const rawQuery = `
    SELECT *, (${relevanceSQL}) AS relevance
    FROM contracts
    WHERE ${searchTerms.map((term: string) => `
      ("from_company" ILIKE '%${term}%' OR "to_company" ILIKE '%${term}%')
    `).join(' OR ')} AND ("from_date" ILIKE '%${data?.from_date?.toString()}%' AND "to_date" ILIKE '%${data?.to_date?.toString()}%') 
    ORDER BY relevance DESC, id DESC
    LIMIT ${data?.pageSize} OFFSET ${pageFetch}
  `;

    const response = await prisma.$transaction([
      prisma.contracts.count({
        where,
      }), 
      prisma.$queryRawUnsafe(rawQuery)
    ])     

    return res.json({contracts: response[1], pages: Math.ceil(Number(response[0])/data?.pageSize), });
 }
 catch(err) {
    return res.status(400).json({message: "Error occured", error: err})
 }

 
};

export default GetAllContracts;
