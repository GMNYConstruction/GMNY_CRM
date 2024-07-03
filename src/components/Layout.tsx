import React, { useEffect } from "react";
import { SideMenu } from "./SideMenu";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { getAccidents, getUsers, AppDispatch } from "@/store/store";
import { fetchAccidents } from "@/store/Accidents/fetch";
import { fetchUsers } from "@/store/Users/fetch";
import { useRouter } from "next/router";

type PropsType = {
  children: React.ReactElement;
};

const Layout = ({ children }: PropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();
  const { data: session } = useSession();
  const { fetched, loading, error, page } = useSelector(getAccidents);
  const { fetchedUser, loadingUser, errorUser } = useSelector(getUsers);

  // useEffect(() => {
  //   if (!fetched && !loading && session?.user) dispatch(fetchAccidents());
  //   if (!fetchedUser && !loadingUser && session?.user) dispatch(fetchUsers());
  // }, [fetched, loading, fetchedUser, loadingUser, session?.user, page]);

  // useEffect(() => {
  //   if (session?.user && page) {
  //     dispatch(fetchAccidents());
  //   }
  // }, [page]);

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
