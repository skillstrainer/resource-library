import React from "react";
import DatePicker from "react-datepicker";
import { createPlugin } from "../utils";
import "react-datepicker/dist/react-datepicker.css";

export const DateTime = ({
  name,
  value,
  onChange,
  className,
  dateFormat,
  timeFormat,
  timeCaption,
  columnName,
  ...dateProps
}) => {
  return (
    <div key={name} className={`mx-4 ${className}`}>
      <div className="mt-1 relative rounded-md shadow-sm">
        <DatePicker
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm border-gray-300 rounded-md"
          dateFormat={dateFormat}
          minDate={new Date()}
          name={name}
          value={new Date(value)}
          onChange={(date) => onChange(date.toISOString())}
          timeFormat={timeFormat}
          timeCaption={timeCaption}
          {...dateProps}
        />
      </div>
    </div>
  );
};

export default createPlugin({ Component: DateTime });
