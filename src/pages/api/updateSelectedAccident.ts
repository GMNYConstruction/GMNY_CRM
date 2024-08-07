import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { getTokenAuth } from "./getTokenAuth";
 

const useUpdateSelectedAccident = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }
  
  !await getTokenAuth(req) && res.status(401).json({message: "You must be signed in!"})

  const data = req.body;
  const mutationObj = {...data} as any;
  delete mutationObj.id
  delete mutationObj.comments
  
  try{
   const result = await prisma.accidents.update({
     where: {
       id: data.id,
     },
     data: mutationObj,
   })
     return res.status(200).json({message: "Accident Updated Successfuly!", accident: result });
  
  }
  catch(err) {
     console.log(err)
     return res.status(400).json({message: "Error occured", error: err})
  }

 
};

export default useUpdateSelectedAccident;