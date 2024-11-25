import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Accidents, CommentType, AuthUser, FilesStandart } from "@/types";
import { Input } from "@/components/Input";
import CalendarDrawer from "@/components/Calendar";
import bin from "../../img/rubbish-bin-svgrepo-com.svg";
import { TextArea } from "@/components/TextArea";
import { Button } from "@/components/Button";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/router";
import { getCurrentAccident } from "@/hooks/fetch/get-accidents";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCreateCommentMutation, useDeleteCommentMutation } from "@/hooks/mutation/comment-mutation";
import { useUpdateAccidentMutation } from "@/hooks/mutation/accident-mutation";
import { DropZone } from "@/components/DropZone";
import { useUploadFiles } from "@/hooks/mutation/files-upload";
import loadIcon from "../../img/loading.svg";

const Extended = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const user = session?.user as AuthUser;
  const [files, setFiles] = useState<FilesStandart[]>([]);
  const componentRef = useRef<any>(null);
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({
    error: false,
    message: "",
  });
  const [readOnly, setReadOnly] = useState(true);
  const [commentResponse, setCommentResponse] = useState("");
  const [comment, setComment] = useState({
    caseid: 0,
    comment: "",
    dateCreated: new Date(),
    userid: user?.id,
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

  const { data: accidentSelected } = useQuery({
    queryKey: ["accidentSelected"],
    queryFn: () => getCurrentAccident(`${id}`),
    retry: 1,
    enabled: !!id,
  });

  const handlePrint = useReactToPrint({
    documentTitle: accidentSelected?.name,
    onBeforeGetContent: async () => setHide(true),
    content: () => componentRef.current,
    onPrintError: () => setHide(false),
    onAfterPrint: async () => setHide(false),
  });

  const handleEditButton = () => {
    setReadOnly(!readOnly);
    if (!readOnly && accidentSelected) {
      setAccident(accidentSelected);
    }
  };

  const commentDelete = useDeleteCommentMutation({
    onSuccess: (res) => {
      queryClient.setQueryData(["accidentSelected"], (old: Accidents) => {
        const updated = old
          ? {
              ...old,
              comments: old?.comments?.filter((item: CommentType) => item?.id !== res?.id),
            }
          : old;
        return updated;
      });
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const commentCreate = useCreateCommentMutation({
    onSuccess: (res) => {
      queryClient.setQueryData(["accidentSelected"], (old: Accidents) => {
        old.comments?.unshift(res?.comment);
        return old;
      });
      setCommentResponse("Posted");
      setTimeout(() => {
        setCommentResponse("");
      }, 5000);
      setComment((prev) => ({
        ...prev,
        comment: "",
      }));
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const uploadFilesToGoogle = useUploadFiles({
    onSuccess: (res) => {
      setFiles([]);
      setLoading(false);
    },
    onError: (err) => {
      console.log(err);
      setLoading(false);
      setResponse({ error: true, message: err?.response?.data?.message });
      setTimeout(() => setResponse({ error: true, message: "" }), 5000);
    },
  });

  const accidentUpdate = useUpdateAccidentMutation({
    onSuccess: (res) => {
      queryClient.setQueryData(["accidentSelected"], (old: Accidents) => {
        return { ...old, ...res?.accident };
      });
      setResponse({ error: false, message: "Accident Updated Successfuly!" });
      setReadOnly(!readOnly);
      setTimeout(() => {
        setResponse({ error: false, message: "" });
      }, 5000);
    },
    onError: (data) => {
      console.log(data);
      setReadOnly(!readOnly);
      accidentSelected && setAccident(accidentSelected);
      setResponse({ error: true, message: "Error occured" });
      setTimeout(() => {
        setResponse({ error: false, message: "Accident Updated Successfuly!" });
      }, 5000);
    },
  });

  useEffect(() => {
    accidentSelected && setAccident({ ...accidentSelected, lastModified: new Date() });
    if (accidentSelected?.id) {
      const id = accidentSelected?.id;
      setComment((prev) => ({
        ...prev,
        caseid: id,
        userid: user?.id,
        dateCreated: new Date(),
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
    const mutationObj = accident;
    delete mutationObj.comments;

    accidentUpdate.mutate(mutationObj);
  };

  const formCommentHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!comment.comment) {
      setCommentResponse("Please enter a valid comment");
      return setTimeout(() => {
        setCommentResponse("");
      }, 4500);
    }

    setComment((prev) => ({ ...prev, dateCreated: new Date() }));

    commentCreate.mutate(comment);
  };

  const deleteComment = async (id: number) => {
    commentDelete.mutate({ id: id, userid: user.id });
  };

  const uploadFiles = () => {
    let directory = accidentSelected?.documentFolder?.split("/")?.pop()?.split("?")[0];
    setLoading(true);
    uploadFilesToGoogle.mutate({ files: files, directory: directory });
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
            <h1 className={`${!response?.error ? "text-green-700" : "text-red-700"}`}>{response?.message}</h1>

            <div className="flex gap-4">
              {!readOnly && (
                <Button btype="submit" properties="w-[250px]">
                  Save
                </Button>
              )}
              <Button btype="button" onClick={handlePrint} properties={`${!readOnly && "hidden"} w-[250px]`}>
                Save PDF
              </Button>
              <Button btype="button" onClick={handleEditButton} properties="text-white bg-red-700 w-[250px]">
                {readOnly ? "Edit" : "Cancel"}
              </Button>
            </div>
          </div>

          <div className="w-full relative pb-2">
            <div className="relative w-full flex flex-col">
              <div className={`w-full py-4 px-2 rounded-md flex gap-2 h-auto ${hide && "flex-col"}`}>
                <div className={`rounded-md p-3 w-full flex flex-col gap-2`}>
                  <div className="flex items-center">
                    <h1 className="w-[20%]">Name:</h1>
                    <Input
                      properties={`w-[80%]`}
                      value={accident.name}
                      inputHandler={handleChange}
                      id="name"
                      placeholder="Enter claimant name"
                      readonly={readOnly}
                    />
                  </div>

                  <div className="flex items-center">
                    <h1 className="w-[20%]">Assigned to:</h1>
                    <Input
                      properties={`w-[80%]`}
                      value={accident.assignedToCompany}
                      inputHandler={handleChange}
                      id="assignedToCompany"
                      placeholder="Enter the name of our company"
                      readonly={readOnly}
                    />
                  </div>

                  <div className="flex items-center">
                    <h1 className="w-[20%]">Worked For:</h1>
                    <Input
                      properties={`w-[80%]`}
                      value={accident.companyWeWorkedFor}
                      inputHandler={handleChange}
                      id="companyWeWorkedFor"
                      placeholder="Enter company we worked for"
                      readonly={readOnly}
                    />
                  </div>

                  <div className="flex items-center">
                    <h1 className="w-[20%]">Date of accident:</h1>
                    <CalendarDrawer
                      divProperties="!w-[80%]"
                      properties={`w-full ${readOnly && "pointer-events-none"} !px-4`}
                      imgProperties="!right-4 !left-auto"
                      placeholder="Date of accident"
                      value={accident?.dateOfAccident}
                      data={accident}
                      id="dateOfAccident"
                      setData={setAccident}
                    />
                  </div>

                  <div className="flex items-center">
                    <h1 className="w-[20%]">Accident location:</h1>
                    <Input
                      properties={`w-[80%]`}
                      value={accident.accidentLocation}
                      inputHandler={handleChange}
                      id="accidentLocation"
                      placeholder="Enter accident location"
                      readonly={readOnly}
                    />
                  </div>

                  <div className="flex items-center">
                    <a
                      href={accidentSelected?.documentFolder}
                      className={`${readOnly ? "w-[40%]" : "w-[20%]"} ${
                        !accidentSelected?.documentFolder && readOnly && "hidden"
                      } text-blue-500 font-medium text-lg underline underline-offset-2`}
                      target="_blank"
                    >
                      Document Folder
                    </a>

                    {!readOnly && (
                      <Input
                        properties={`w-[80%]`}
                        value={accident.documentFolder}
                        inputHandler={handleChange}
                        id="documentFolder"
                        placeholder="Enter link to folder"
                        readonly={readOnly}
                      />
                    )}
                  </div>
                </div>

                <div className={`rounded-md p-3 w-full flex flex-col gap-2 `}>
                  <div className="flex items-center">
                    <h1 className="w-[20%]">First check: </h1>
                    <Input
                      properties={`w-[80%]`}
                      value={accident.firstCheck}
                      inputHandler={handleChange}
                      id="firstCheck"
                      placeholder="First check"
                      readonly={readOnly}
                    />
                  </div>

                  <div className="flex items-center">
                    <h1 className="w-[20%]">Last check: </h1>
                    <Input
                      properties={`w-[80%]`}
                      value={accident.lastCheck}
                      inputHandler={handleChange}
                      id="lastCheck"
                      placeholder="Last Check"
                      readonly={readOnly}
                    />
                  </div>

                  <div className="flex items-center">
                    <h1 className="w-[20%]">Last day worked: </h1>
                    <Input
                      properties={`w-[80%]`}
                      value={accident.lastDayOfWork}
                      inputHandler={handleChange}
                      id="lastDayOfWork"
                      placeholder="Last day of work"
                      readonly={readOnly}
                    />
                  </div>

                  <div className="flex items-center">
                    <h1 className="w-[20%]">Report:</h1>
                    <Input
                      properties={`w-[80%]`}
                      value={accident.report}
                      inputHandler={handleChange}
                      id="report"
                      placeholder="Report"
                      readonly={readOnly}
                    />
                  </div>

                  <div className="flex items-center">
                    <h1 className="w-[20%]">eFroi:</h1>
                    <Input
                      properties={`w-[80%]`}
                      value={accident.efroi}
                      inputHandler={handleChange}
                      id="efroi"
                      placeholder="EFroi"
                      readonly={readOnly}
                    />
                  </div>

                  <div className="flex items-center">
                    <h1 className="w-[20%]">Back To Work:</h1>
                    <Input
                      properties={`w-[80%]`}
                      value={accident.backToWork}
                      inputHandler={handleChange}
                      id="backToWork"
                      placeholder="Back To Work"
                      readonly={readOnly}
                    />
                  </div>
                </div>
              </div>

              <div
                className={`${hide && "hidden"} ${
                  !accidentSelected?.documentFolder && "hidden"
                } flex flex-col justify-center gap-4 relative`}
              >
                <DropZone files={files} setFiles={(e: any) => setFiles(e)} />
                <div className={`hidden justify-center gap-10 ${files.length > 0 && "!flex"}`}>
                  <Button onClick={uploadFiles} btype="button" properties="w-[200px] bg-green-700 text-white">
                    Upload
                  </Button>
                  <Button btype="button" onClick={() => setFiles([])} properties="w-[200px] bg-red-700 text-white">
                    Delete All
                  </Button>
                </div>

                {loading && (
                  <div className="w-full h-full absolute !bg-black/50 rounded-sm flex">
                    <Image className="mx-auto my-auto inset-0 self-center animate-spin" src={loadIcon} alt="loading" />
                  </div>
                )}
              </div>

              <div className={`w-full min-h-[30%] max-h-[45%] py-4 px-2 flex gap-2 ${hide && "flex-col"}`}>
                <div className={`w-[50%] ${hide && "w-[100%]"}`}>
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
                <div className={`w-[50%] ${hide && "w-[100%]"}`}>
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
              <div className={`w-full min-h-[30%] max-h-[45%] py-4 px-2 flex gap-2 ${hide && "flex-col"}`}>
                <div className={`w-[50%] ${hide && "w-[100%]"}`}>
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
                <div className={`w-[50%] ${hide && "w-[100%]"}`}>
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
              <h1 className={`${commentResponse.toLowerCase() === "posted" ? "text-green-700" : "text-red-700"}`}>
                {commentResponse}
              </h1>
              <TextArea
                properties={`w-full !min-h-[120px] max-h-[400px]`}
                placeholder="Enter your comment"
                value={comment?.comment}
                id="comment"
                inputHandler={handleCommentChange}
              />
              <Button btype="submit" properties={`bg-red-700 text-white`}>
                Post comment
              </Button>
            </div>

            {accidentSelected?.comments?.map((comment: CommentType) => {
              const date = new Date(comment?.dateCreated);
              return (
                <div key={comment?.id} className="rounded-md p-2 flex flex-col gap-1 relative">
                  <h1
                    className={`w-[95%] resize-none border-b border-neutral-500 text-wrap whitespace-pre-wrap ${
                      hide && "w-full"
                    }`}
                  >
                    {comment?.comment}
                  </h1>
                  <span>
                    {date.toLocaleDateString()} {date?.toLocaleTimeString()}
                  </span>
                  {comment.userid === user.id && (
                    <button
                      type="button"
                      onClick={() => deleteComment(comment?.id)}
                      className={`absolute right-4 bottom-9  ${hide && "hidden"}`}
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
