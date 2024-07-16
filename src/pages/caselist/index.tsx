import React, { useEffect, useMemo, useState } from "react";
import Paggination from "@/components/Paggination";
import CalendarDrawer from "@/components/Calendar";
import AccidentCard from "@/components/AccidentCard";
import { Accidents } from "@/types";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { TextArea } from "@/components/TextArea";
import { useDebouncedValue } from "@/types/use-debounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AccidentSelect, getAccidentsPage } from "@/hooks/fetch/get-accidents";
import { useCreateAccidentMutation } from "@/hooks/mutation/accident-mutation";

import Image from "next/image";
import notFound from "../../img/noloads.svg";
import loadingIcon from "../../img/loading.svg";

const Page = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [pagesArr, setPagesArr] = useState<number[]>([1]);
  const [filters, setFilters] = useState({
    search: "",
    date: "",
  });
  const [accident, setAccident] = useState<Accidents>({
    id: 0,
    name: "",
    report: "",
    efroi: "",
    witness: "",
    correspondence: "",
    notice: "",
    accidentDescription: "",
    accidentLocation: "",
    backToWork: "",
    dateOfAccident: "",
    documentFolder: "",
    firstCheck: "",
    lastCheck: "",
    lastDayOfWork: "",
    companyWeWorkedFor: "",
    assignedToCompany: "",
    lastModified: new Date(),
    comments: [],
  });
  const [createNewAccident, setCreateNewAccident] = useState(false);
  const [response, setResponse] = useState("");

  const {
    data: accidentsPage,
    isLoading: isLoadingAccidents,
    error,
  } = useQuery({
    queryKey: ["accidentsPage", page, useDebouncedValue(filters.search, 400), useDebouncedValue(filters.date, 400)],
    queryFn: () => getAccidentsPage(page, 10, filters.search, filters.date.toString()),
    retry: 1,
  });

  const accidentCreate = useCreateAccidentMutation({
    onSuccess: (res) => {
      queryClient.setQueryData(["accidentsPage", page, filters.search, filters.date], (old: AccidentSelect) => {
        console.log(old?.accidents, res);
        old?.accidents?.unshift(res?.accident);
        old?.accidents?.pop();
        return old;
      });
      setResponse(res?.message);
      setAccident({
        ...accident,
        name: "",
        dateOfAccident: "",
        companyWeWorkedFor: "",
        assignedToCompany: "",
        documentFolder: "",
        accidentDescription: "",
      });
      setCreateNewAccident(!createNewAccident);

      setTimeout(() => {
        setResponse("");
      }, 3000);
    },
    onError: (data) => {
      setResponse(data?.response?.data?.detail);
      setTimeout(() => {
        setResponse("");
      }, 3000);
    },
  });

  useEffect(() => {
    if (accidentsPage) {
      setPagesArr(Array.from({ length: accidentsPage.pages }, (_, i) => i + 1));
    }
    if (filters.date) {
      setPage(1);
    }
    if (error) {
      setResponse("Can't fetch data");
      setTimeout(() => {
        setResponse("");
      }, 10000);
    }
  }, [accidentsPage, error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setAccident((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    accidentCreate.mutate(accident);
  };

  const WhatToDisplay = useMemo(() => {
    if (isLoadingAccidents)
      return (
        <div className="flex flex-col">
          <Image src={loadingIcon} className="self-center animate-spin" alt="loading" />
          <h1 className="text-center text-2xl font-medium">Loading...</h1>
        </div>
      );

    if (accidentsPage?.accidents && accidentsPage?.accidents?.length !== 0)
      return (
        <>
          <Paggination
            pagesArr={pagesArr}
            currentPage={page}
            onPageClick={(value) => {
              setPage(value);
            }}
          />
          {accidentsPage?.accidents?.map((e: any) => {
            return <AccidentCard data={e} key={e.id} />;
          })}
        </>
      );

    return (
      <div className="flex flex-col">
        <Image src={notFound} className="self-center" alt="loading" />
        <h1 className="text-center text-2xl font-medium">No records</h1>
      </div>
    );
  }, [isLoadingAccidents, accidentsPage?.accidents, accidentsPage, accidentCreate, pagesArr, page]);

  const handleFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setPage(1);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] relative py-4 px-2 flex flex-col gap-4">
        <div className="w-full flex justify-between">
          <div className="flex gap-2">
            <Button
              btype="button"
              onClick={() => setCreateNewAccident(!createNewAccident)}
              properties={`bg-primaryred text-white`}
            >
              {createNewAccident ? "Stop Creating New Accident" : "Create New Accident Case"}
            </Button>
            {createNewAccident && (
              <Button btype="submit" form="accidentForm">
                Submit New Accident
              </Button>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative">
              <CalendarDrawer
                id="date"
                value={filters?.date}
                data={filters}
                setData={setFilters}
                divProperties="!h-[42px] !w-[200px]"
                properties="h-[42px]  border-2"
              />
            </div>
            <Input
              id="search"
              type="text"
              placeholder="search"
              properties="h-[42px] w-[200px]"
              value={filters.search}
              inputHandler={handleFilters}
            />
          </div>
        </div>

        <div>
          <h1 className={`${response === "New Accident Created!" ? "text-green-600" : "text-red-500"}`}>{response}</h1>
        </div>

        <form
          id="accidentForm"
          onSubmit={handleSubmit}
          className={`w-full flex flex-col gap-3 ${!createNewAccident && "hidden"}`}
        >
          <div className="relative w-full h-[250px] border border-neutral-500 rounded-md p-2 flex gap-2">
            <div className="flex w-[50%] flex-col gap-2 justify-center">
              <div className="grid grid-cols-[2fr,4fr] items-center">
                <h1>Name:</h1>
                <Input placeholder="Name" value={accident.name} inputHandler={handleChange} id="name" />
              </div>
              <div className="grid grid-cols-[2fr,4fr] items-center">
                <h1>Assigned to:</h1>
                <Input
                  value={accident.assignedToCompany}
                  inputHandler={handleChange}
                  id="assignedToCompany"
                  placeholder="Enter the name of our company"
                />
              </div>
              <div className="grid grid-cols-[2fr,4fr] items-center">
                <h1>Company We Worked For:</h1>
                <Input
                  value={accident.companyWeWorkedFor}
                  inputHandler={handleChange}
                  id="companyWeWorkedFor"
                  placeholder="Enter the name of the company we worked for"
                />
              </div>
              <div className="grid grid-cols-[2fr,4fr] items-center">
                <h1>Date Of Accident:</h1>
                <CalendarDrawer
                  setData={setAccident}
                  value={accident.dateOfAccident}
                  divProperties="w-full h-[36px]"
                  properties="h-[36px]"
                  placeholder="dateOfAccident"
                  data={accident}
                />
              </div>
              <div className="grid grid-cols-[2fr,4fr] items-center">
                <h1>Document Folder:</h1>
                <Input
                  value={accident.documentFolder}
                  inputHandler={handleChange}
                  id="documentFolder"
                  placeholder="Enter link to folder"
                />
              </div>
            </div>
            <div className="w-[50%] h-full flex flex-col gap-1 justify-center">
              <h2>Description: </h2>
              <TextArea
                value={accident.accidentDescription}
                id="accidentDescription"
                placeholder="Accident Description"
                inputHandler={handleChange}
              />
            </div>
          </div>
        </form>

        {WhatToDisplay}
      </div>
    </div>
  );
};

export default Page;
