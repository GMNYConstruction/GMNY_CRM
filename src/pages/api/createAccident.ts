import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { getTokenAuth } from "./getTokenAuth";

const CreateAccident = async (req: NextApiRequest, res: NextApiResponse) => {
 
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }
 
 !await getTokenAuth(req) !== false && res.status(401).json({message: "You must be signed in!"})

 const data = req.body; 

 if (!data || !data.name) return res.status(400).json({message: "Data Is Missing!"})

 try{
   const response = await prisma.accidents.create({
        data: {
            name: data.name,
            report: data.report || '',
            efroi: data.efroi || '',
            witness: data.witness || '',
            correspondence: data.correspondence || '',
            notice: data.notice || '',
            accidentDescription: data.accidentDescription || '',
            accidentLocation: data.accidentLocation || '',
            backToWork: data.backToWork || '',
            dateOfAccident: data.dateOfAccident || '',
            documentFolder: data.documentFolder || '',
            firstCheck: data.firstCheck || '',
            lastCheck: data.lastCheck || '',
            lastDayOfWork: data.lastDayOfWork || '',
            companyWeWorkedFor: data.companyWeWorkedFor || '',
            assignedToCompany: data.assignedToCompany || '',
            lastModified: new Date(),
        }
    })
    return res.status(200).json({message: 'New Accident Created!', accident: response })
 }
 catch(err) {
    return res.status(400).json({message: "Error occured", error: err})
   
 }
 

};

export default CreateAccident;