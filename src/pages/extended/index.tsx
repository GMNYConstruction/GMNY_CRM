import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useGetAccidentById } from "@/hooks/useGetAccidentById";
import { useDispatch } from "react-redux";
import { editAccidents } from "@/store/Accidents/editAccidents";
import { AppDispatch } from "@/store/store";
import { Accidents, CommentType } from "@/types";
import { Input } from "@/components/Input";
import CalendarDrawer from "@/components/Calendar";
import { TextArea } from "@/components/TextArea";
import { Button } from "@/components/Button";
import { getApiResponse } from "@/utils/getApiResponse";

const Extended = () => {
  const today = new Date().toLocaleDateString("en-US");
  const { data: session } = useSession();
  const user = session?.user as any;
  const accidentSelected = useGetAccidentById();
  const dispatch = useDispatch<AppDispatch>();
  const [readOnly, setReadOnly] = useState(true);
  const [response, setResponse] = useState("");
  const [commentResponse, setCommentResponse] = useState("");
  const [comment, setComment] = useState<CommentType>({} as CommentType);
  const [accident, setAccident] = useState<Accidents>({} as Accidents);

  useEffect(() => {
    accidentSelected && setAccident(accidentSelected);
    if (accidentSelected?.id) {
      const id = accidentSelected?.id;
      setComment((prev) => ({
        ...prev,
        caseid: id,
        userid: user?.id,
        dateCreated: today,
        user: {
          id: user?.id,
          email: user?.email,
          name: user?.name,
          accessLvl: user?.accessLvl,
        },
      }));
    }
  }, [accidentSelected?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setAccident((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await getApiResponse({ apiRoute: "/api/updateSelectedAccident", body: accident });

    setResponse(result.message);

    if (accidentSelected && accidentSelected.comments && result.message === "Update Successful") {
      dispatch(
        editAccidents({
          ...accidentSelected,
          name: accident?.name,
          report: accident?.report,
          efroi: accident?.efroi,
          witness: accident?.witness,
          correspondence: accident?.correspondence,
          notice: accident?.notice,
          accidentDescription: accident?.accidentDescription,
          accidentLocation: accident?.accidentLocation,
          backToWork: accident?.backToWork,
          dateOfAccident: accident?.dateOfAccident,
          documentFolder: accident?.documentFolder,
          firstCheck: accident?.firstCheck,
          lastCheck: accident?.lastCheck,
          lastDayOfWork: accident?.lastDayOfWork,
          companyWeWorkedFor: accident?.companyWeWorkedFor,
          assignedToCompany: accident?.assignedToCompany,
        })
      );
    }

    setTimeout(() => {
      setResponse("");
    }, 5000);
    setReadOnly(!readOnly);
  };

  const formCommentHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await getApiResponse({ apiRoute: "/api/postNewComment", body: comment });

    setCommentResponse(result.message);

    if (accidentSelected && accidentSelected.comments && result.message === "Comment posted successfuly!") {
      dispatch(
        editAccidents({
          ...accidentSelected,
          comments: [...accidentSelected.comments, comment],
        })
      );

      setComment((prev) => ({
        ...prev,
        comment: "",
        id: result.id++ || 0,
      }));
    }
    setTimeout(() => {
      setResponse("");
    }, 5000);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center ">
      <form onSubmit={formHandler} className="flex flex-col  w-[90%] justify-center">
        <div className="flex w-full justify-between gap-4 px-2">
          <h1 className={`${response === "Update Successful" ? "text-green-600" : "text-red-500"}`}>{response}</h1>
          <div className="flex gap-4">
            {!readOnly && <Button text="Save" btype="submit" />}
            <Button
              text={`${readOnly ? "Edit" : "Cancel"}`}
              btype="button"
              onClick={() => setReadOnly(!readOnly)}
              properties="text-white bg-primaryred"
            />
          </div>
        </div>
        <div className="w-full relative pb-2">
          <div className="relative w-full flex flex-col">
            <div className="w-full h-[40vh] py-4 px-2 rounded-md flex gap-2 ">
              <div className="rounded-md p-3 w-[50%] flex flex-col gap-2">
                <div className="flex items-center">
                  <h1 className="w-[30%]">ID:</h1>
                  <h1 className="w-[70%]">{accident.id}</h1>
                </div>
                <div className="flex items-center">
                  <h1 className="w-[30%]">Name:</h1>
                  <Input
                    properties={`w-[70%]`}
                    value={accident.name}
                    inputHandler={handleChange}
                    id="name"
                    placeholder="Enter claimant name"
                    readonly={readOnly}
                  />
                </div>

                <div className="flex items-center">
                  <h1 className="w-[30%]">Assigned to:</h1>
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
                  <h1 className="w-[30%]">Comapny We Worked For:</h1>
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
                  <h1 className="w-[30%]">Date of accident:</h1>
                  <CalendarDrawer
                    properties="w-[70%]"
                    value={accident.dateOfAccident}
                    change="dateOfAccident"
                    data={accident}
                    setData={readOnly ? () => {} : setAccident}
                  />
                </div>

                <div className="flex items-center">
                  <h1 className="w-[30%]">Accident location:</h1>
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
                  <h1 className="w-[30%]">documentFolder:</h1>
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

              <div className="rounded-md p-3 w-[50%] flex flex-col gap-2">
                <div className="flex items-center">
                  <h1 className="w-[30%]">First check: </h1>
                  <CalendarDrawer
                    properties="w-[70%]"
                    value={accident.firstCheck}
                    change="firstCheck"
                    data={accident}
                    setData={readOnly ? () => {} : setAccident}
                  />
                </div>

                <div className="flex items-center">
                  <h1 className="w-[30%]">Last check: </h1>
                  <CalendarDrawer
                    properties="w-[70%]"
                    value={accident.lastCheck}
                    change="lastCheck"
                    data={accident}
                    setData={readOnly ? () => {} : setAccident}
                  />
                </div>

                <div className="flex items-center">
                  <h1 className="w-[30%]">Last day worked: </h1>
                  <CalendarDrawer
                    properties="w-[70%]"
                    value={accident.lastDayOfWork}
                    change="lastDayOfWork"
                    data={accident}
                    setData={readOnly ? () => {} : setAccident}
                  />
                </div>

                <div className="flex items-center">
                  <h1 className="w-[30%]">Repost:</h1>
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
                  <h1 className="w-[30%]">eFroi:</h1>
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
                  <h1 className="w-[30%]">Back To Work:</h1>
                  <Input
                    properties={`w-[70%]`}
                    value={accident.backToWork}
                    inputHandler={handleChange}
                    id="backToWork"
                    placeholder="Back To Work"
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
          </div>
        </div>
      </form>
      <form onSubmit={formCommentHandler} className="w-[90%] flex flex-col gap-2 overflow-auto">
        <h1 className="w-[35%]">Comments: </h1>
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-2">
            <h1 className={`${commentResponse === "Comment posted successfuly!" ? "text-green-600" : "text-red-500"}`}>
              {commentResponse}
            </h1>
            <TextArea
              properties={`w-full h-[50px] min-h-[50px] max-h-[150px]`}
              placeholder="Enter your comment"
              value={comment?.comment}
              id="comment"
              inputHandler={handleCommentChange}
            />
            <Button text="Post comment" btype="submit" properties={`bg-primaryred text-white`} />
          </div>

          {accidentSelected?.comments?.map((comment) => {
            return (
              <div key={comment.id} className="rounded-md py-2 px-1 flex flex-col gap-1">
                <h1 className="w-full border-b pl-6 border-neutral-500">{comment.comment}</h1>
                <span>
                  {comment.user?.name} {comment.dateCreated}
                </span>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default Extended;
