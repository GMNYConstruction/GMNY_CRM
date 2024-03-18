import React, { FC } from "react";

interface IProps {
  type?: string;
  placeholder: string;
  id: string;
  value?: string | undefined;
  properties?: string | undefined;
  readonly?: boolean;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<IProps> = ({ type, placeholder, id, value, properties, readonly = false, inputHandler }) => {
  return (
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={inputHandler}
      className={`p-1 px-4 rounded-md border-2 ${properties}`}
      readOnly={readonly}
    />
  );
};
