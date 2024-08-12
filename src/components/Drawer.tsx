import React, { Dispatch, FC } from "react";
import close from "../img/x.svg";

interface IProps {
  topText: string;
  classNameMainDiv?: string;
  classNameSecondDiv?: string;
  drawer: {
    status: boolean;
    id: string;
  };
  setDrawer: (id: string) => void;
  topChildren?: React.ReactNode;
}

const Drawer: FC<IProps> = ({ topText, topChildren, drawer, classNameMainDiv, classNameSecondDiv, setDrawer }) => {
  return (
    <div
      className={`${
        drawer?.status && "w-full h-screen absolute inset-0 bg-black/30"
      } ease-in-out duration-300 ${classNameMainDiv}`}
    >
      <div
        className={`absolute top-0 p-[25px] w-[370px] h-screen overflow-y-scroll border ease-in-out duration-300 bg-neutral-50 ${
          drawer?.status ? "right-[0px]" : "right-[-375px]"
        }  flex flex-col gap-y-[48px] ${classNameSecondDiv}`}
      >
        <div className="flex w-full justify-between items-center">
          <h2 className="text-neutral-900 text-lg font-medium leading-7">{topText}</h2>
          <button onClick={() => setDrawer("")}>
            <img src={close} alt="" />
          </button>
        </div>
        {topChildren}
      </div>
    </div>
  );
};

export default Drawer;
