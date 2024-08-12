import React, { Dispatch, FC } from "react";
import close from "../img/x.svg";
import Image from "next/image";

interface IProps {
  drawer: {
    id: string | number;
    status: boolean;
  };
  topText: string;
  children?: React.ReactNode;
  setDrawer: () => void;
}

const Drawer: FC<IProps> = ({ drawer, children, topText, setDrawer }) => {
  return (
    <div
      className={`overflow-hidden top-0 !z-50 ease-in-out !w-screen fixed !h-screen left-[-100%] duration-500 ${
        drawer.status && "!left-0 !bg-black/30"
      }`}
    >
      <div
        className={`h-full w-[380px] bg-white mr-0 ml-auto top-0 py-5 px-6 fixed ease-in-out duration-500 z-50 flex flex-col gap-4 overflow-x-hidden ${
          drawer.status ? "right-0" : "right-[-381px]"
        }`}
      >
        <div className="flex w-full justify-between items-center">
          <h2 className="text-neutral-900 text-lg font-medium leading-7">{topText}</h2>
          <button type="button" onClick={setDrawer}>
            <Image src={close} className="h-5 w-5" alt="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
