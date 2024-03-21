import React from "react";
import img from "../img/logo.png";
import accident from "../img/accident-svgrepo-com.svg";
import admins from "../img/user-admin-svgrepo-com.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { signOut } from "next-auth/react";

export const SideMenu = () => {
  const activeClass = "rounded-lg shadow border border-neutral-100"; // That's an active class
  const { route } = useRouter();

  return (
    <div className="w-72 h-screen relative gap-y-[48px] py-[24px] px-8 py flex-col items-start flex">
      <div className="flex-col justify-start items-start gap-12 flex">
        <div className="w-12 h-12 bg-white rounded-2xl shadow border border-neutral-200 justify-center items-center inline-flex">
          <Image className="w-12 h-12 rounded-2xl" src={img} alt="logo" />
        </div>
      </div>

      <div className="w-60 flex-col gap-y-4 flex ">
        <div className={`flex justify-between w-full px-4 py-2.5 ${route === "/caselist" ? activeClass : ""}`}>
          <Link className="flex items-center gap-1 ext-neutral-900 text-sm font-normal  leading-tight" href="/caselist">
            <Image className="w-[20px] h-[20px]" src={accident} alt="image" />
            Case List
          </Link>
        </div>

        <div className={`flex justify-between w-full px-4 py-2.5 ${route === "/admins" ? activeClass : ""}`}>
          <Link className="flex items-center gap-1 ext-neutral-900 text-sm font-normal  leading-tight " href="/admins">
            <Image className="w-[20px] h-[20px]" src={admins} alt="image" />
            Admins
          </Link>
        </div>
      </div>

      <div className="absolute bottom-[28px] px-4 py-2.5">
        <button
          className="flex items-center gap-1 ext-neutral-900 text-sm font-normal  leading-tight"
          onClick={() => signOut()}
        >
          {/* <img className="w-[20px] h-[20px]" src={staff} alt="" /> */}
          Log out
        </button>
      </div>
    </div>
  );
};
