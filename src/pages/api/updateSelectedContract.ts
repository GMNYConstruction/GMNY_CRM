import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { getTokenAuth } from "./getTokenAuth";
 

const useUpdateSelectedContract = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }
  
  !await getTokenAuth(req) && res.status(401).json({message: "You must be signed in!"})

  const data = req.body;
  
  if(!data || !data?.id) return res.status(401).json({message: "No data!"})
  
  const mutationObj = {} as any;

  if(data?.from_date) mutationObj['from_date'] = data?.from_date
  if(data?.to_date) mutationObj['from_date'] = data?.to_date
  if(data?.from_company) mutationObj['from_company'] = data?.from_company
  if(data?.to_company) mutationObj['to_company'] = data?.to_company
  if(data?.link) mutationObj['link'] = data?.link
  
  try{
   const result = await prisma.contracts.update({
     where: {
       id: data.id,
     },
     data: mutationObj,
   })
     return res.status(200).json({message: "Accident Updated Successfuly!", contract: result });
  
  }
  catch(err) {
     console.log(err)
     return res.status(400).json({message: "Error occured", error: err})
  }

 
};

export default useUpdateSelectedContract;