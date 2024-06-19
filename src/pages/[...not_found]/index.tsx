import React from "react";
import logo from "../../img/logo.png";
import Image from "next/image";

const NotFoundCatchAll = () => {
  return (
    <div className="flex flex-col h-full w-full p-[20vh]">
      <Image className="h-[160px] w-[160px] rounded-lg self-center" src={logo} alt="" />
      <h1 className="text-5xl font-medium self-center">Working on it</h1>
      <h2 className="text-3xl font-medium self-center text-neutral-500">Not Found</h2>
    </div>
  );
};

export default NotFoundCatchAll;
