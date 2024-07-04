import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma"; 
import { getTokenAuth } from "./getTokenAuth";
  

const CreateNewComment = async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

  !await getTokenAuth(req) && res.status(401).json({message: "You must be signed in!"});

  const data = req.body;

  if(!data || !data.caseid || !data.comment || !data.userid || !data.dateCreated) {
    return res.status(400).json({message: "Data Is Missing"});
  }


 try{
    
    const comment = await prisma.comments.create({
        data: {
          caseid: data.caseid,
          comment: data.comment,
          userid: data.userid,
          dateCreated: data.dateCreated,
        },
    });

    const updateCase = await prisma.accidents.update({
      where: {
        id: data.caseid,
      },
      data: {
        lastModified: new Date(),
      }
      
    })

    return res.status(200).json({message: "Comment posted successfuly!", id: comment.id, case: updateCase, comment: comment});

 }
 catch(err) {
    console.log(err)
    return res.status(400).json({message: "Error occured", error: err})
 }

 
};

export default CreateNewComment;