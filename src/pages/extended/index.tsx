import React, { useState, useEffect } from "react";
import { useGetAccidentById } from "@/hooks/useGetAccidentById";
import { useDispatch } from "react-redux";
import { editAccidents } from "@/store/Accidents/put";
import { AppDispatch } from "@/store/store";
import { Accidents } from "@/types";
import { Input } from "@/components/Input";
import CalendarDrawer from "@/components/Calendar";
import { TextArea } from "@/components/TextArea";
import { read } from "fs";

const Extended = () => {
  const accidentSelected = useGetAccidentById();
  const dispatch = useDispatch<AppDispatch>();
  const [readOnly, setReadOnly] = useState(true);

  const [accident, setAccident] = useState<Accidents>({
    id: 1,
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
    comments: [],
  });

  useEffect(() => {
    setAccident({
      id: accidentSelected?.id,
      name: accidentSelected?.name,
      report: accidentSelected?.report,
      efroi: accidentSelected?.efroi,
      witness: accidentSelected?.witness,
      correspondence: accidentSelected?.correspondence,
      notice: accidentSelected?.notice,
      accidentDescription: accidentSelected?.accidentDescription,
      accidentLocation: accidentSelected?.accidentLocation,
      backToWork: accidentSelected?.backToWork,
      dateOfAccident: accidentSelected?.dateOfAccident,
      documentFolder: accidentSelected?.documentFolder,
      firstCheck: accidentSelected?.firstCheck,
      lastCheck: accidentSelected?.lastCheck,
      lastDayOfWork: accidentSelected?.lastDayOfWork,
      companyWeWorkedFor: accidentSelected?.companyWeWorkedFor,
      assignedToCompany: accidentSelected?.assignedToCompany,
      comments: accidentSelected?.comments,
    });
  }, [accidentSelected?.id, accidentSelected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setAccident((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const edit = () => {
    if (accidentSelected) {
      dispatch(
        editAccidents({
          ...accidentSelected,
          name: accident.name,
        })
      );
    }
  };

  return (
    <form className="flex w-full h-full justify-center ">
      <div className="w-[90%] relative pb-2">
        <div className="relative w-full flex flex-col">
          <div className="w-full h-[40vh] py-4 px-2 rounded-md flex gap-2 ">
            <div className=" border border-black rounded-md p-3 w-[50%] flex flex-col gap-2">
              <div className="flex items-center">
                <h1 className="w-[25%]">ID:</h1>
                <h1 className="w-[70%]">{accident.id}</h1>
              </div>
              <div className="flex items-center">
                <h1 className="w-[25%]">Name:</h1>
                <Input
                  properties={`w-[70%]`}
                  value={accident.name}
                  inputHandler={handleChange}
                  id="name"
                  placeholder="Enter claimant name"
                  readonly={readOnly}
                />
              </div>
              {/* <Input properties={`w-[70%]`} value={name} onChange={(e) => setName(e.target.value)} />
              <button onClick={edit}>save</button> */}

              <div className="flex items-center">
                <h1 className="w-[25%]">Assigned to:</h1>
                <Input
                  properties={`w-[70%]`}
                  value={accident.assignedToCompany}
                  inputHandler={handleChange}
                  id="assignedToCompany"
                  placeholder="Enter the name of our company"
                  readonly={readOnly}
                />
              </div>

              <div className="flex items-center">
                <h1 className="w-[25%]">Comapny name:</h1>
                <Input
                  properties={`w-[70%]`}
                  value={accident.companyWeWorkedFor}
                  inputHandler={handleChange}
                  id="companyWeWorkedFor"
                  placeholder="Enter company we worked for"
                  readonly={readOnly}
                />
              </div>

              <div className="flex items-center">
                <h1 className="w-[25%]">Date of accident:</h1>
                <CalendarDrawer
                  properties="w-[70%]"
                  value={accident.dateOfAccident}
                  change="dateOfAccident"
                  data={accident}
                  setData={setAccident}
                />
              </div>

              <div className="flex items-center">
                <h1 className="w-[25%]">Accident location:</h1>
                <Input
                  properties={`w-[70%]`}
                  value={accident.accidentLocation}
                  inputHandler={handleChange}
                  id="accidentLocation"
                  placeholder="Enter accident location"
                  readonly={readOnly}
                />
              </div>

              <div className="flex items-center">
                <h1 className="w-[25%]">documentFolder:</h1>
                <Input
                  properties={`w-[70%]`}
                  value={accident.documentFolder}
                  inputHandler={handleChange}
                  id="documentFolder"
                  placeholder="Enter link to folder"
                  readonly={readOnly}
                />
              </div>
            </div>

            <div className=" border border-black rounded-md p-3 w-[50%] flex flex-col gap-2">
              <div className="flex items-center">
                <h1 className="w-[25%]">First check: </h1>
                <CalendarDrawer
                  properties="w-[70%]"
                  value={accident.firstCheck}
                  change="firstCheck"
                  data={accident}
                  setData={setAccident}
                />
              </div>

              <div className="flex items-center">
                <h1 className="w-[25%]">Last check: </h1>
                <CalendarDrawer
                  properties="w-[70%]"
                  value={accident.lastCheck}
                  change="lastCheck"
                  data={accident}
                  setData={setAccident}
                />
              </div>

              <div className="flex items-center">
                <h1 className="w-[25%]">Last day worked: </h1>
                <CalendarDrawer
                  properties="w-[70%]"
                  value={accident.lastDayOfWork}
                  change="lastDayOfWork"
                  data={accident}
                  setData={setAccident}
                />
              </div>

              <div className="flex items-center">
                <h1 className="w-[25%]">Repost:</h1>
                <Input
                  properties={`w-[70%]`}
                  value={accident.report}
                  inputHandler={handleChange}
                  id="report"
                  placeholder="Report"
                  readonly={readOnly}
                />
              </div>

              <div className="flex items-center">
                <h1 className="w-[25%]">eFroi:</h1>
                <Input
                  properties={`w-[70%]`}
                  value={accident.efroi}
                  inputHandler={handleChange}
                  id="efroi"
                  placeholder="EFroi"
                  readonly={readOnly}
                />
              </div>

              <div className="flex items-center">
                <h1 className="w-[25%]">Back To Work:</h1>
                <Input
                  properties={`w-[70%]`}
                  value={accident.backToWork}
                  inputHandler={handleChange}
                  id="backToWork"
                  placeholder="back To Work"
                  readonly={readOnly}
                />
              </div>
            </div>
          </div>

          <div className="w-full min-h-[30%] max-h-[45%] py-4 px-2 flex gap-2">
            <div className="relative  w-[50%]">
              <h1>Accident description:</h1>
              <TextArea
                placeholder="Accident description"
                value={accident.accidentDescription}
                inputHandler={handleChange}
                id="accidentDescription"
                readOnly={readOnly}
              />
            </div>
            <div className="w-[50%] ">
              <h1>Witness:</h1>
              <TextArea
                placeholder="Accident witness"
                value={accident.witness}
                inputHandler={handleChange}
                id="witness"
                readOnly={readOnly}
              />
            </div>
          </div>
          <div className="w-full min-h-[30%] max-h-[45%] py-4 px-2 flex gap-2">
            <div className="relative  w-[50%]">
              <h1>Correspondence with NYSIF, Insurance, Lawyers:</h1>
              <TextArea
                placeholder="Correspondence with NYSIF, Insurance, Lawyers."
                value={accident.correspondence}
                inputHandler={handleChange}
                id="correspondence"
                readOnly={readOnly}
              />
            </div>
            <div className="w-[50%] ">
              <h1>Notice:</h1>
              <TextArea
                placeholder="Notice"
                value={accident.notice}
                inputHandler={handleChange}
                id="notice"
                readOnly={readOnly}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 overflow-auto">
            <h1 className="w-[35%]">Comments: </h1>
            <div className="flex flex-col gap-3 ">
              {accident?.comments?.map((comment) => {
                return (
                  <div key={comment.id} className=" rounded-md py-2 px-1 flex flex-col gap-1">
                    <h1 className="w-full border-b pl-6 border-neutral-500">{comment.comment}</h1>
                    <span>
                      {comment.user?.name} {comment.dateCreated}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Extended;
