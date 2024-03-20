import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { json } from "stream/consumers";
 

const postNewComment = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

  const data = req.body;

 try{
    
    const comment = await prisma.comments.create({
        data: {
          caseid: data.caseid,
          comment: data.comment,
          userid: data.userid,
          dateCreated: data.dateCreated,
        },
    });

    return res.status(200).json({message: "Comment posted successfuly!", id: comment.id});

 }
 catch(err) {
    console.log(err)
    return res.status(400).json({message: "Error occured", error: err})
 }

 
};

export default postNewComment;