import React, { FC } from "react";

interface IProps {
  btype: "submit" | "reset" | "button" | undefined;
  properties?: string | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  form?: string;
}

export const Button: FC<IProps> = ({ children, properties, btype, onClick, form }) => (
  <button
    onClick={onClick}
    type={btype}
    form={form}
    className={`text-center text-sm font-medium px-4 py-2.5 rounded-lg shadow border border-neutral-250 border-white ${properties}`}
  >
    {children}
  </button>
);
