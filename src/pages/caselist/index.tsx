import React, { useState } from "react";
import AccidentCard from "@/components/AccidentCard";
import { useSelector } from "react-redux";
import { getAccidents } from "@/store/store";
import { Accidents } from "@/types";

const Page = () => {
  const { accidents } = useSelector(getAccidents);
  const [search, setSearch] = useState("");

  const filterList = () => {
    return accidents?.filter((e: Accidents) => {
      if (
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.dateOfAccident.toString().toLowerCase().includes(search.toLowerCase()) ||
        e.accidentLocation.toLowerCase().includes(search.toLowerCase()) ||
        e.assignedToCompany.toLowerCase().includes(search.toLowerCase()) ||
        e.companyWeWorkedFor.toLowerCase().includes(search.toLowerCase())
      )
        return e;
    });
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] relative py-4 px-2 flex flex-col gap-4">
        <div className="w-full flex justify-between">
          <h1>Test UI sample</h1>
          <input
            type="text"
            placeholder="search"
            className="py-2 px-1 border border-black rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {filterList().map((e: any) => {
          return <AccidentCard data={e} key={e.id} />;
        })}
      </div>
    </div>
  );
};

export default Page;
