import Link from "next/link";
import React from "react";
import icback from "../../../img/ic_back.svg";
import Image from "next/image";

const index = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <Link className="hidden xs-max:flex h-fit p-2 items-center gap-2" href={"/forms/spanishfull"}>
        <Image src={icback} alt="back" />
        Versión en español
      </Link>
      <iframe
        src="https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhA1nYYRJgfM6dN4D8MJmNJeM1enpC_FHi5b0IpOdZUAC2uQrk_s5AJ5bpS179qDNjg*&hosted=false"
        className="min-h-[460px] xs-max:!h-[86%] w-full h-full self-center"
        loading="eager"
      ></iframe>
    </div>
  );
};

export default index;
