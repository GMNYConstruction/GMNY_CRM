import React, { useEffect } from "react";
import { SideMenu } from "./SideMenu";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

type PropsType = {
  children: React.ReactElement;
};

const Layout = ({ children }: PropsType) => {
  const route = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex ">
      {session?.user && route.pathname !== "/" && <SideMenu />}
      <div
        className={`${
          session?.user &&
          "w-full h-screen overflow-x-hidden bg-white rounded-tl-[32px] border-l border-t border-neutral-200 px-8 py-4"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
