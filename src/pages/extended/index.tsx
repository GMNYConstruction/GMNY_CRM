import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useGetAccidentById } from "@/hooks/useGetAccidentById";
import { useDispatch } from "react-redux";
import { editAccident } from "@/store/Accidents/editAccident";
import { AppDispatch } from "@/store/store";
import { Accidents, CommentType, AuthUser } from "@/types";
import { Input } from "@/components/Input";
import CalendarDrawer from "@/components/Calendar";
import bin from "../../img/rubbish-bin-svgrepo-com.svg";
import { TextArea } from "@/components/TextArea";
import { Button } from "@/components/Button";
import { getApiResponse } from "@/utils/getApiResponse";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

const Extended = () => {
  const today = new Date().toLocaleDateString("en-US");
  const { data: session } = useSession();
  const [hide, setHide] = useState(false);
  const user = session?.user as AuthUser;
  const accidentSelected = useGetAccidentById();
  const dispatch = useDispatch<AppDispatch>();
  const [readOnly, setReadOnly] = useState(true);
  const [response, setResponse] = useState("");
  const [commentResponse, setCommentResponse] = useState("");
  const [comment, setComment] = useState<CommentType>({} as CommentType);
  const [accident, setAccident] = useState<Accidents>({} as Accidents);
  const componentRef = useRef<any>(null);

  const handlePrint = useReactToPrint({
    onBeforeGetContent: async () => setHide(true),
    content: () => componentRef.current,
    documentTitle: accidentSelected?.name,
    onAfterPrint: () => setHide(false),
    onPrintError: () => setHide(false),
  });

  const handleEditButton = () => {
    setReadOnly(!readOnly);
    !readOnly && accidentSelected && setAccident(accidentSelected);
  };

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
          status: user?.status,
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

    if (accidentSelected && result.message === "Accident Updated Successfuly!") {
      dispatch(
        editAccident({
          ...accidentSelected,
          ...accident,
          comments: accidentSelected.comments,
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

    const result = await getApiResponse({ apiRoute: "/api/createNewComment", body: comment });
    setCommentResponse(result.message);

    if (accidentSelected && accidentSelected.comments && result.message === "Comment posted successfuly!") {
      dispatch(
        editAccident({
          ...accidentSelected,
          comments: [{ ...comment, id: result.id } as CommentType, ...accidentSelected.comments],
        })
      );

      setComment((prev) => ({
        ...prev,
        comment: "",
      }));
    }

    setTimeout(() => {
      setCommentResponse("");
    }, 5000);
  };

  const deleteComment = async (id: number) => {
    const res = await getApiResponse({ apiRoute: "/api/deleteComment", body: { id: id, userid: user.id } });

    if (res.message === "Comment deleted!" && accidentSelected && accidentSelected.comments) {
      dispatch(
        editAccident({
          ...accidentSelected,
          comments: accidentSelected.comments.filter((item) => item.id !== id),
        })
      );
    }
  };

  return (
    <div>
      <div
        className={`absolute w-[100vw] h-[100vh] z-[1000] bg-neutral-500 inset-0 ${
          !hide && "hidden"
        } ease-in-out duration-300`}
      ></div>
      <div className="flex flex-col w-full justify-center items-center" ref={componentRef}>
        <form onSubmit={formHandler} className="flex flex-col  w-[90%] justify-center">
          <div className={`flex w-full justify-between gap-4 px-2 ${hide && "hidden"}`}>
            <h1 className={`${response === "Accident Updated Successfuly!" ? "text-green-600" : "text-red-500"}`}>
              {response}
            </h1>
            <div className="flex gap-4">
              {!readOnly && <Button text="Save" btype="submit" />}
              <Button btype="button" text="Save PDF" onClick={handlePrint} properties={`${!readOnly && "hidden"}`} />
              <Button
                text={`${readOnly ? "Edit" : "Cancel"}`}
                btype="button"
                onClick={handleEditButton}
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
                      properties={`w-[70%] ${readOnly && "pointer-events-none"}`}
                      value={accident.dateOfAccident}
                      change="dateOfAccident"
                      data={accident}
                      setData={setAccident}
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
                    <h1 className="w-[30%]">
                      <a href={accident.documentFolder} target="_blank">
                        Document Folder
                      </a>
                    </h1>
                    {!readOnly && (
                      <Input
                        properties={`w-[70%]`}
                        value={accident.documentFolder}
                        inputHandler={handleChange}
                        id="documentFolder"
                        placeholder="Enter link to folder"
                        readonly={readOnly}
                      />
                    )}
                  </div>
                </div>

                <div className="rounded-md p-3 w-[50%] flex flex-col gap-2">
                  <div className="flex items-center">
                    <h1 className="w-[30%]">First check: </h1>
                    <Input
                      properties={`w-[70%]`}
                      value={accident.firstCheck}
                      inputHandler={handleChange}
                      id="firstCheck"
                      placeholder="First check"
                      readonly={readOnly}
                    />
                  </div>

                  <div className="flex items-center">
                    <h1 className="w-[30%]">Last check: </h1>
                    <Input
                      properties={`w-[70%]`}
                      value={accident.lastCheck}
                      inputHandler={handleChange}
                      id="lastCheck"
                      placeholder="Last Check"
                      readonly={readOnly}
                    />
                  </div>

                  <div className="flex items-center">
                    <h1 className="w-[30%]">Last day worked: </h1>
                    <Input
                      properties={`w-[70%]`}
                      value={accident.lastDayOfWork}
                      inputHandler={handleChange}
                      id="lastDayOfWork"
                      placeholder="Last day of work"
                      readonly={readOnly}
                    />
                  </div>

                  <div className="flex items-center">
                    <h1 className="w-[30%]">Report:</h1>
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
                    resize={hide}
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
                    resize={hide}
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
                    resize={hide}
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
                    resize={hide}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        <form onSubmit={formCommentHandler} className={`w-[90%] flex flex-col gap-2 `}>
          <h1 className="w-[35%]">Comments: </h1>
          <div className="flex flex-col gap-3">
            <div className={`flex flex-col gap-2 ${hide && "hidden"}`}>
              <h1
                className={`${commentResponse === "Comment posted successfuly!" ? "text-green-600" : "text-red-500"}`}
              >
                {commentResponse}
              </h1>
              <TextArea
                properties={`w-full min-h-[80px] max-h-[150px]`}
                placeholder="Enter your comment"
                value={comment?.comment}
                id="comment"
                inputHandler={handleCommentChange}
              />
              <Button text="Post comment" btype="submit" properties={`bg-primaryred text-white`} />
            </div>

            {accidentSelected?.comments?.map((comment) => {
              return (
                <div key={comment.id} className="rounded-md p-2 flex flex-col gap-1 relative">
                  <h1 className={`w-[95%] resize-none border-b border-neutral-500 text-wrap ${hide && "w-full"}`}>
                    {comment.comment}
                  </h1>
                  <span>
                    {comment.user?.name} {comment.dateCreated}
                  </span>
                  {comment.userid === user.id && (
                    <button
                      type="button"
                      onClick={() => deleteComment(comment.id)}
                      className={`absolute right-[2%] top-[25%] ${hide && "hidden"}`}
                    >
                      <Image className="h-[25px] w-[25px]" alt="delete" src={bin} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Extended;
