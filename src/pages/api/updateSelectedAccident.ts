import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { json } from "stream/consumers";
 

const UpdateSelecteddata = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Wrong Method" });
  }

  const data = req.body;

 try{
    const updateUser = await prisma.accidents.update({
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
    accidentDescription: data.dataDescription,
    accidentLocation: data.dataLocation,
    backToWork: data.backToWork,
    dateOfAccident: data.dateOfAccident,
    documentFolder: data.documentFolder,
    firstCheck: data.firstCheck,
    lastCheck: data.lastCheck,
    lastDayOfWork: data.lastDayOfWork,
    companyWeWorkedFor: data.companyWeWorkedFor,
    assignedToCompany: data.assignedToCompany,
  },
})
    return res.status(200).json({message: "Update Successful"});

 }
 catch(err) {
    console.log(err)
    return res.status(400).json({message: "Error occured", error: err})
 }

 
};

export default UpdateSelecteddata;