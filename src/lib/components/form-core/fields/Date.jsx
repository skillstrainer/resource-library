import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createPlugin } from "../utils";

export const DateField = ({
  name,
  value,
  onChange,
  className,
  dateFormat = "dd/MM/yyyy",
  timeFormat,
  timeCaption,
  columnName,
  ...dateProps
}) => {
  return (
    <div key={name} className={`${className}`}>
      <div className="relative rounded-md shadow-sm">
        <DatePicker
          style={{ boxSizing: "border-box" }}
          className="input-primary"
          dateFormat={dateFormat}
          name={name}
          selected={value ? new Date(value) : new Date()}
          onChange={(date) => onChange(date.toISOString())}
          timeFormat={timeFormat}
          timeCaption={timeCaption}
          {...dateProps}
        />
      </div>
    </div>
  );
};

export default createPlugin({ Component: DateField });
