import React, { FC } from "react";

interface IProps {
  placeholder?: string;
  id: string;
  properties?: string | undefined;
  value?: string | undefined;
  options: string[] | undefined;
  inputHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: FC<IProps> = ({ placeholder, id, properties, value, options, inputHandler }) => {
  return (
    <select
      name={id}
      id={id}
      className={`ease-in-out duration-300 ${properties}`}
      onChange={inputHandler}
      value={value ? value : ""}
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
