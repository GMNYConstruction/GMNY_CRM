import React, { FC } from "react";
import Link from "next/link";
import { AccidentCardInterface } from "@/types";

const AccidentCard: FC<AccidentCardInterface> = ({ data }) => {
  return (
    <div className="flex flex-col gap-3" key={data.id}>
      <div className="relative w-full h-[200  px] border border-red-500 rounded-md p-2 flex">
        <div className="w-[10%]">
          <h1>id:</h1>
          <h2>{data.id}</h2>
        </div>
        <div className="flex w-[35%] flex-col gap-1 justify-center">
          <h2>Name: {data.name}</h2>
          <h2>Assigned to: {data.assignedToCompany}</h2>
          <h2>Company we worked for: {data.companyWeWorkedFor}</h2>
          <h2>Date of accident: {data.dateOfAccident}</h2>
          <h2>
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
            value={data.accidentDescription}
          ></textarea>
        </div>
        <div className="flex flex-col justify-center items-center w-[5%]">
          <Link href={`/extended?id=${data.id}`}>...</Link>
        </div>
      </div>
    </div>
  );
};

export default AccidentCard;
