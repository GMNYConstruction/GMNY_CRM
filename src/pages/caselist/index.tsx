import React, { useEffect, useMemo, useState } from "react";
import { Accidents } from "@/types";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { TextArea } from "@/components/TextArea";
import Paggination from "@/components/Paggination";
import CalendarDrawer from "@/components/Calendar";
import { Table } from "@/components/TableComponent";
import { useDebouncedValue } from "@/types/use-debounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AccidentSelect, getAccidentsPage } from "@/hooks/fetch/get-accidents";
import { useCreateAccidentMutation } from "@/hooks/mutation/accident-mutation";
import moment from "moment";

import Image from "next/image";
import cross from "../../img/x.svg";
import notFound from "../../img/noloads.svg";
import loadingIcon from "../../img/loading.svg";
import Drawer from "@/components/Drawer";

const Page = () => {
  const queryClient = useQueryClient();
  const [drawer, setDrawer] = useState({
    status: false,
    id: "",
  });
  const [page, setPage] = useState(1);
  const [pagesArr, setPagesArr] = useState<number[]>([1]);
  const [response, setResponse] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    date: "",
  });
  const [accident, setAccident] = useState({
    id: 0,
    name: "",
    accidentDescription: "",
    dateOfAccident: "",
    documentFolder: "",
    companyWeWorkedFor: "",
    assignedToCompany: "",
    lastModified: new Date(),
  });

  const normalizeData = (data: Accidents[]) => {
    return data?.map((item: Accidents) => ({
      id: item?.id,
      tableData: [
        item?.name,
        item?.assignedToCompany,
        item?.companyWeWorkedFor,
        item?.dateOfAccident,
        item?.accidentLocation,
        moment(item?.lastModified).format("M/D/YYYY HH:mm"),
        item?.documentFolder,
      ],
    }));
  };

  const { data: accidentsPage, isLoading: isLoadingAccidents } = useQuery({
    queryKey: ["accidentsPage", page, useDebouncedValue(filters.search, 400), useDebouncedValue(filters.date, 400)],
    queryFn: () => getAccidentsPage(page, 12, filters.search, filters.date.toString()),
    retry: 1,
  });

  const accidentCreate = useCreateAccidentMutation({
    onSuccess: (res) => {
      queryClient.setQueryData(["accidentsPage", page, filters.search, filters.date], (old: AccidentSelect) => {
        old?.accidents?.unshift(res?.accident);
        if (old?.accidents?.length === 12) old?.accidents?.pop();
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
      setDrawer({
        id: "",
        status: false,
      });

      setTimeout(() => {
        setResponse("");
      }, 3000);
    },
    onError: (data) => {
      setResponse(data?.response?.data?.message);
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
  }, [accidentsPage?.pages, filters?.date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setAccident((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    accidentCreate.mutate(accident);
  };

  const DisplayFunction = useMemo(() => {
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
          <Table
            headers={[
              "Name",
              "Assigned to",
              "Worked for",
              "DOL",
              "Accident Location",
              "Last Modified",
              "Documents",
              "Action",
            ]}
            values={normalizeData(accidentsPage?.accidents) as any}
          />
        </>
      );

    return (
      <div className="flex flex-col">
        <Image src={notFound} className="self-center" alt="loading" />
        <h1 className="text-center text-2xl font-medium">No records</h1>
      </div>
    );
  }, [accidentsPage?.accidents, accidentsPage, accidentCreate.isSuccess, pagesArr, page]);

  const handleFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setPage(1);
  };

  return (
    <>
      <Drawer drawer={drawer} setDrawer={() => setDrawer({ id: "", status: false })} topText="Add Accident Record">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {response && <p className="text-red-500 font-medium">{response}</p>}
          <div className="w-full flex gap-1 flex-col">
            <p className="text-black font-medium text-base">Full Name</p>
            <Input id="name" value={accident.name} inputHandler={handleChange} placeholder="Name" />
          </div>
          <div className="w-full flex gap-1 flex-col">
            <p className="text-black font-medium text-base">Assigned to</p>
            <Input
              id="assignedToCompany"
              value={accident.assignedToCompany}
              inputHandler={handleChange}
              placeholder="Assigned to"
            />
          </div>
          <div className="w-full flex gap-1 flex-col">
            <p className="text-black font-medium text-base">Company we worked for</p>
            <Input
              id="companyWeWorkedFor"
              value={accident.companyWeWorkedFor}
              inputHandler={handleChange}
              placeholder="We worked for"
            />
          </div>
          <div className="w-full flex gap-1 flex-col">
            <p className="text-black font-medium text-base">Date Of Accident</p>
            <CalendarDrawer
              setData={setAccident}
              value={accident.dateOfAccident}
              divProperties="w-full h-[36px]"
              properties="h-[36px]"
              placeholder="Date of Accident"
              id="dateOfAccident"
              data={accident}
            />
          </div>
          <div className="w-full flex gap-1 flex-col">
            <p className="text-black font-medium text-base">Accident Description</p>
            <TextArea
              id="accidentDescription"
              value={accident.accidentDescription}
              inputHandler={handleChange}
              placeholder="Accident Description"
            />
          </div>
          <Button btype="submit" properties="bg-red-500 text-white">
            Submit
          </Button>
        </form>
      </Drawer>

      <div className="w-full flex justify-center">
        <div className="w-full relative py-4 px-2 flex flex-col gap-4">
          <div className="w-full flex justify-between">
            <div className="flex gap-2">
              <Button
                btype="button"
                onClick={() =>
                  setDrawer({
                    id: "",
                    status: true,
                  })
                }
                properties={`bg-primaryred text-white`}
              >
                Create New Accident
              </Button>
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
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, date: "" }))}
                  className="absolute top-0 bottom-0 my-auto right-3"
                >
                  <Image src={cross} alt="delete" />
                </button>
              </div>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder="search"
                  properties="h-[42px] w-[200px]"
                  value={filters.search}
                  inputHandler={handleFilters}
                />
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                  className="absolute top-0 bottom-0 my-auto right-3"
                >
                  <Image src={cross} alt="delete" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h1 className={`${response === "New Accident Created!" ? "text-green-600" : "text-red-500"}`}>
              {response}
            </h1>
          </div>

          {DisplayFunction}
        </div>
      </div>
    </>
  );
};

export default Page;
