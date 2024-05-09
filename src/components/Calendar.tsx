import React, { Dispatch, FC } from "react";
import calendar from "../img/calendar.svg";
import DateTime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { Accidents } from "@/types";
import Image from "next/image";

interface Iprops {
  data: Accidents;
  value?: string;
  id?: string;
  setData: Dispatch<React.SetStateAction<any>>;
  properties?: string;
  divProperties?: string;
  setOneValue?: Dispatch<React.SetStateAction<string>>;
  imgProperties?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CalendarDrawer: FC<Iprops> = ({
  data,
  value,
  id,
  setData,
  properties,
  disabled = false,
  divProperties,
  setOneValue,
  imgProperties,
  placeholder,
}) => {
  const handleChange = (date: string | moment.Moment) => {
    setOneValue
      ? setOneValue(moment(date).format("M/D/YYYY"))
      : setData({ ...data, [id ? id : "dateOfAccident"]: moment(date).format("M/D/YYYY") });
  };

  let inputProps = {
    placeholder: placeholder,
    id: id,
    disabled: disabled,
    className: `w-full h-10 pl-11 py-2 rounded-md border-[2px] border-neutral-200 text-neutral-500 text-base ${properties}`,
  };

  return (
    <div className={`w-[312px] relative flex flex-col ${divProperties} `}>
      <DateTime
        input={true}
        dateFormat={"M/D/YYYY"}
        timeFormat={false}
        value={value ? value : data.dateOfAccident}
        inputProps={inputProps}
        onChange={(date) => handleChange(date)}
      />
      <Image src={calendar} className={`absolute top-[25%] left-[15px] ${imgProperties}`} alt="calendar" />
    </div>
  );
};

export default CalendarDrawer;
