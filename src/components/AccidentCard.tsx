import React, { FC } from "react";
import { AccidentCardInterface } from "@/types";
import pencil from "../img/pencil.svg";
import Image from "next/image";
import Link from "next/link";

const AccidentCard: FC<AccidentCardInterface> = ({ data }) => {
  return (
    <div className="flex justify-between gap-3" key={data.id}>
      <div className="relative w-full h-[170px] border border-neutral-500 rounded-md p-2 flex">
        <div className="flex w-[45%] flex-col gap-1 justify-center">
          <h2>Name: {data.name}</h2>
          <h2>Assigned to: {data.assignedToCompany}</h2>
          <h2>Company we worked for: {data.companyWeWorkedFor}</h2>
          <h2>Date of accident: {data.dateOfAccident}</h2>
          <h2 className="text-blue-500 font-medium underline underline-offset-2">
            <a href={data.documentFolder} target="_blank">
              Document Folder
            </a>
          </h2>
        </div>

        <div className="w-[50%] h-full flex flex-col gap-1 justify-center">
          <h2>Description: </h2>
          <textarea
            disabled
            className="w-full h-full resize-none bg-transparent"
            value={data.accidentDescription || ""}
          ></textarea>
        </div>

        <div className="flex items-center mr-0 ml-auto w-[3%]">
          <Link href={`/extended?id=${data.id}`}>
            <Image src={pencil} alt="Edit" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccidentCard;
