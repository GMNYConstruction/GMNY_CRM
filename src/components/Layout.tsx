import React from "react";
import { SideMenu } from "./SideMenu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type PropsType = {
  children: React.ReactElement;
};

const Layout = ({ children }: PropsType) => {
  const route = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const isHomePage = route.pathname === "/";

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {isLoggedIn && !isHomePage && (
        <div className="h-screen w-fit">
          <SideMenu />
        </div>
      )}
      <div
        className={`flex-grow h-full overflow-y-auto ${
          isLoggedIn ? "bg-white rounded-tl-[32px] border-l border-t border-neutral-200 px-8 py-4" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
