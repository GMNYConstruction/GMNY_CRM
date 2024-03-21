import React, { FC } from "react";

interface IProps {
  placeholder?: string;
  id: string;
  properties?: string | undefined;
  value?: string | undefined;
  options: string[] | undefined;
  inputHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  readonly?: boolean;
}

export const Select: FC<IProps> = ({ placeholder, id, properties, value, options, inputHandler, readonly = false }) => {
  return (
    <select
      name={id}
      id={id}
      className={`p-1 px-2.5 rounded-md border-2 ${properties}`}
      onChange={inputHandler}
      value={value ? value : ""}
      disabled={readonly}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options?.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
