import React, { FC } from "react";

interface IProps {
  placeholder: string;
  id: string;
  properties?: string | undefined;
  value: string | undefined;
  inputHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
}

export const TextArea: FC<IProps> = ({ readOnly = false, placeholder, id, properties, value, inputHandler }) => {
  const active = "text-red-500 text-sm font-medium  leading-tight border-b-2 border-red-500";
  return (
    <textarea
      className={`${properties} w-full min-h-[200px] max-h-[300px] px-4 py-3 bg-white rounded-lg shadow border border-neutral-200 flex-col `}
      name={id}
      id={id}
      cols={30}
      rows={7}
      onChange={inputHandler}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  );
};
