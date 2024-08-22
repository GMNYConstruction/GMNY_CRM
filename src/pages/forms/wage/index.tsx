import Link from "next/link";
import React from "react";
import icback from "../../../img/ic_back.svg";
import Image from "next/image";
import { widthRedirects } from "@/utils/widthRedirects";

const index = () => {
  widthRedirects(
    "https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhCXpEyXmGcpumbeo-B44PMCyAajcF6FRUuA7LW9eh2GoKWC_gnpXXAWaF0zWSQKpk8*&hosted=false"
  );

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <p className="hidden xs-max:flex h-fit p-2 items-center gap-2">
        <Image src={icback} alt="back" />
        Wage form
      </p>
      <iframe
        src="https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhCXpEyXmGcpumbeo-B44PMCyAajcF6FRUuA7LW9eh2GoKWC_gnpXXAWaF0zWSQKpk8*&hosted=false"
        className="min-h-[460px] xs-max:!h-[86%] w-full h-full self-center"
        loading="eager"
      ></iframe>
    </div>
  );
};

export default index;
