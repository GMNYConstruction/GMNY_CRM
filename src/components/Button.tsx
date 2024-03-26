import React, { FC } from "react";

interface IProps {
  text: string;
  btype: "submit" | "reset" | "button" | undefined;
  properties?: string | undefined;
  form?: string;
  onClick?: () => void;
}

export const Button: FC<IProps> = ({ text, properties, btype, form, onClick }) => (
  <button
    onClick={onClick}
    type={btype}
    form={form}
    className={`text-center text-sm font-medium  leading-tight w-[420px] h-10 px-4 py-2.5 rounded-lg shadow border border-white ${properties}`}
  >
    {text}
  </button>
);
