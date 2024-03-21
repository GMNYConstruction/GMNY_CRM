import React, { useEffect } from "react";
import { SideMenu } from "./SideMenu";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { getAccidents, getUsers, AppDispatch } from "@/store/store";
import { fetchAccidents } from "@/store/Accidents/fetch";
import { fetchUsers } from "@/store/Users/fetch";

type PropsType = {
  children: React.ReactElement;
};

const Layout = ({ children }: PropsType) => {
  const { data: session } = useSession();
  const { fetched, loading, error } = useSelector(getAccidents);
  const { fetchedUser, loadingUser, errorUser } = useSelector(getUsers);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!fetched && !loading) dispatch(fetchAccidents());
    if (!fetchedUser && !loadingUser) dispatch(fetchUsers());
  }, [fetched, loading]);

  return (
    <div className="flex ">
      {session ? (
        <>
          <SideMenu />

          <div className="w-full h-screen overflow-x-hidden bg-white rounded-tl-[32px] border-l border-t border-neutral-200 px-8 py-4">
            {children}
          </div>
        </>
      ) : (
        <> {children} </>
      )}
    </div>
  );
};

export default Layout;
