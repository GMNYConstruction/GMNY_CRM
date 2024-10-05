import { FilesStandart } from "@/types";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import bin from "../img/rubbish-bin-svgrepo-com.svg";

type FileDropProps = {
  setFiles: (files: FilesStandart[]) => void;
  files: FilesStandart[];
  className?: string;
};

export const DropZone = ({ setFiles, files, className }: FileDropProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const adaptedFiles = acceptedFiles?.map((file: File) => {
        const newFile = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        return newFile;
      });
      let merged = [...files, ...adaptedFiles] as any;
      setFiles(merged);
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "*/*": [],
    },
  });

  return (
    <div className="">
      <div
        {...getRootProps()}
        className={`bg-grey-blue border-bright-blue relative flex h-56 overflow-y-auto flex-col items-center justify-center rounded-[8px] border-2 border-dashed`}
      >
        <input {...getInputProps()} />

        {files.length === 0 ? (
          <p className="w-[383px] text-center">
            <span className="text-bright-blue">Click to select file </span>
            <br />
            <span className="text-gray-500">or drag and drop files</span>
          </p>
        ) : (
          <div className="w-full h-full">
            {files.map((pic) => {
              return (
                <div className="flex justify-between w-full p-2 z-10" key={`${pic?.name}${pic?.size}`}>
                  <div className="flex gap-2 w-[40%] overflow-hidden">
                    <img src={pic?.preview} className="h-12 w-12" />
                    <div className="w-[80%] flex flex-col gap-1">
                      <p className="truncate text-black text-base font-semibold">Name: {pic?.name}</p>
                      <p className="truncate text-black text-base font-semibold">Size: {pic?.size}</p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // fixes the issues with opening selection menu
                      setFiles(files?.filter((file) => file?.name !== pic?.name));
                    }}
                    className="w-10 "
                    type="button"
                  >
                    <Image src={bin} className="h-6" alt="delete" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
