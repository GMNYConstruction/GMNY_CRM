import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { json } from "stream/consumers";
 

const UpdateSelectedAccident = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

  const data = req.body;


  // if (!data || !data.name || !data.report || !data.efroi || !data.witness || !data.correspondence || !data.notice || !data.accidentDescription 
  //   || !data.accidentLocation || !data.backToWork || !data.dateOfAccident || !data.documentFolder || !data.firstCheck || !data.lastCheck || !data.lastDayOfWork || !data.companyWeWorkedFor
  //   || !data.assignedToCompany
  //   )
  //   return res.status(400).json({message: "Data Is Missing!"});


 try{
  await prisma.accidents.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      report: data.report,
      efroi: data.efroi,
      witness: data.witness,
      correspondence: data.correspondence,
      notice: data.notice,
      accidentDescription: data.accidentDescription,
      accidentLocation: data.accidentLocation,
      backToWork: data.backToWork,
      dateOfAccident: data.dateOfAccident,
      documentFolder: data.documentFolder,
      firstCheck: data.firstCheck,
      lastCheck: data.lastCheck,
      lastDayOfWork: data.lastDayOfWork,
      companyWeWorkedFor: data.companyWeWorkedFor,
      assignedToCompany: data.assignedToCompany,
      lastModified: new Date(),
    },
  })
    return res.status(200).json({message: "Accident Updated Successfuly!"});

 }
 catch(err) {
    console.log(err)
    return res.status(400).json({message: "Error occured", error: err})
 }

 
};

export default UpdateSelectedAccident;