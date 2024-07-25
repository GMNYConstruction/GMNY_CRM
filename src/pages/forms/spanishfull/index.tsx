import Link from "next/link";
import React from "react";
import icback from "../../../img/ic_back.svg";
import Image from "next/image";

const index = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <Link className="hidden xs-max:flex h-fit p-2 items-center gap-2" href={"/forms/englishfull"}>
        <Image src={icback} alt="back" />
        English Version
      </Link>
      <iframe
        src="https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhBFZNDAxOsEhxQDv37WVZpcSsIPVybM_svqi8dZz7StACKmRWw4vUL3ezQZXYSjEZg*&hosted=false"
        className="min-h-[460px] xs-max:!h-[86%] w-full h-full self-center"
        loading="eager"
      ></iframe>
    </div>
  );
};

export default index;
