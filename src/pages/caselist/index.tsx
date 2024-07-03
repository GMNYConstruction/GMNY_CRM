import React, { useEffect, useState } from "react";
import AccidentCard from "@/components/AccidentCard";
import { useSelector } from "react-redux";
import { getAccidents } from "@/store/store";
import { Accidents } from "@/types";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import CalendarDrawer from "@/components/Calendar";
import { TextArea } from "@/components/TextArea";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setNewAccident } from "@/store/Accidents/setNewAccident";
import { getApiResponse } from "@/utils/getApiResponse";
import Paggination from "@/components/Paggination";
import { editPage } from "@/store/Accidents/changePage";
import { useQuery } from "@tanstack/react-query";
import { getAccidentsPage } from "@/hooks/fetch/get-accidents";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { accidents, maxPage, page } = useSelector(getAccidents);
  const [pagesArr, setPagesArr] = useState<number[]>([1]);
  const [search, setSearch] = useState("");
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

  const { data: accidentsPage, isLoading: isLoadingModerationCustomers } = useQuery({
    queryKey: ["accidentsPage", page, search],
    queryFn: () => getAccidentsPage(page, 10, search),
    retry: 1,
  });

  useEffect(() => {
    if (accidentsPage?.pages) {
      setPagesArr(Array.from({ length: accidentsPage.pages }, (_, i) => i + 1));
    }
  }, [accidentsPage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setAccident((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await getApiResponse({ apiRoute: "/api/createAccident", body: accident });

    setResponse(result.message);

    if (result.message === "New Accident Created!") {
      dispatch(
        setNewAccident({
          newAccident: result.accident,
        })
      );
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
    }

    setTimeout(() => {
      setResponse("");
    }, 3000);
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
            <Input
              id="search"
              type="text"
              placeholder="search"
              properties="h-[42px]"
              value={search}
              inputHandler={(e) => setSearch(e.target.value)}
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
                  divProperties="w-full"
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

        {accidentsPage?.accidents && (
          <Paggination
            pagesArr={pagesArr}
            currentPage={page}
            onPageClick={(value) => {
              dispatch(editPage({ page: value }));
            }}
          />
        )}

        {accidentsPage?.accidents?.map((e: any) => {
          return <AccidentCard data={e} key={e.id} />;
        })}
      </div>
    </div>
  );
};

export default Page;
