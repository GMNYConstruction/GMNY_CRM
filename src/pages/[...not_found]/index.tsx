import React from "react";
import logo from "../../img/logo.png";
import Image from "next/image";
import Link from "next/link";

const NotFoundCatchAll = () => {
  return (
    <div className="flex flex-col h-full w-full p-[20vh] self-center">
      <Image className="h-[160px] w-[160px] rounded-lg self-center" src={logo} alt="" />
      <h1 className="text-5xl font-medium self-center">Working on it</h1>
      <h2 className="text-3xl font-medium self-center text-neutral-500">Not Found</h2>
      <Link href="/" className="text-3xl font-medium self-center text-blue-600">
        Home
      </Link>
    </div>
  );
};

export default NotFoundCatchAll;
