import React, { Dispatch, FC } from "react";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { Accidents } from "@/types";

interface Iprops {
  value: string | undefined;
  change: string;
  data: Accidents;
  setData: Dispatch<React.SetStateAction<any>>;
  properties?: string;
}

const CalendarDrawer: FC<Iprops> = ({ value, change, data, setData, properties }) => {
  const handleChange = (date: string | moment.Moment) => {
    setData({ ...data, [change]: moment(date).format("MM/DD/YYYY") });
  };

  return (
    <DateTime
      input={true}
      dateFormat={"MM/DD/YYYY"}
      timeFormat={false}
      value={value}
      closeOnSelect={true}
      onChange={(date) => handleChange(date)}
      className={`h-9 pl-4 py-2.5 bg-white rounded-lg shadow border border-neutral-200 text-neutral-400 text-sm font-normal flex items-center ${properties}`}
    />
  );
};

export default CalendarDrawer;
