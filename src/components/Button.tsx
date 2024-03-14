import React, { FC } from "react";

interface IProps {
  text: string;
  btype: "submit" | "reset" | "button" | undefined;
  properties?: string | undefined;
  onClick?: () => void;
}

export const Button: FC<IProps> = ({ text, properties, btype, onClick }) => (
  <button
    onClick={onClick}
    type={btype}
    className={`text-center text-sm font-medium  leading-tight w-[420px] h-10 px-4 py-2.5 rounded-lg shadow border border-white ${properties}`}
  >
    {text}
  </button>
);
