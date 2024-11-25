import moment from "moment";
import Image from "next/image";
import DateTime from "react-datetime";
import React, { Dispatch, FC } from "react";
import calendar from "../img/calendar.svg";
import "react-datetime/css/react-datetime.css";

interface Iprops {
  id?: string;
  data: {
    [key: string]: any;
  };
  value?: string;
  setData: Dispatch<React.SetStateAction<any>>;
  properties?: string;
  divProperties?: string;
  setOneValue?: Dispatch<React.SetStateAction<string>>;
  imgProperties?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CalendarDrawer: FC<Iprops> = ({
  id,
  data,
  value,
  setData,
  properties,
  disabled = false,
  divProperties,
  setOneValue,
  imgProperties,
  placeholder,
}) => {
  const handleChange = (date: string | moment.Moment) => {
    const value = moment(date).format("M/D/YYYY").includes("Invalid") ? "" : moment(date).format("M/D/YYYY");
    if (setOneValue) return setOneValue(value);
    if (id) return setData({ ...data, [id]: value });

    setData({ ...data, dateTime: value });
  };

  let inputProps = {
    id: id,
    placeholder: placeholder,
    value: value,
    disabled: disabled,
    className: `w-full h-10 pl-11 py-2 rounded-md border-2 border-neutral-150 text-black text-base outline-none ${properties}`,
  };

  return (
    <div className={`w-[312px] relative flex flex-col ${divProperties}`}>
      <DateTime
        input={true}
        dateFormat={"M/D/YYYY"}
        timeFormat={false}
        inputProps={inputProps}
        onChange={(date) => handleChange(date)}
      />
      <Image src={calendar} className={`absolute top-[25%] left-[15px] ${imgProperties}`} alt="calendar" />
    </div>
  );
};

export default CalendarDrawer;
