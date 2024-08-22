import Link from "next/link";
import React from "react";
import icback from "../../../img/ic_back.svg";
import Image from "next/image";
import { widthRedirects } from "@/utils/widthRedirects";

const index = () => {
  widthRedirects(
    "https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhCL9oOdDgQFx7RMAGVEy8o5VLGoLjLrlU-DjYN0QCkZqI3J01KVR3jFkQMnj5ZMjQA*&hosted=false"
  );
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <Link className="hidden xs-max:flex h-fit p-2 items-center gap-2" href={"/forms/spanish"}>
        <Image src={icback} alt="back" />
        Versión en español
      </Link>
      <iframe
        src="https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhCL9oOdDgQFx7RMAGVEy8o5VLGoLjLrlU-DjYN0QCkZqI3J01KVR3jFkQMnj5ZMjQA*&hosted=false"
        className="min-h-[460px] xs-max:!h-[86%] w-full h-full self-center"
        loading="eager"
      ></iframe>
    </div>
  );
};

export default index;
