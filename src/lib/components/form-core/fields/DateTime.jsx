import React from "react";
import { createPlugin } from "../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DateTime = ({
  name,
  onChange,
  placeholder,
  className,
  value,
  ...fieldProps
}) => {
  return (
    <div key={name} className={`${className}`}>
      <div className="relative rounded-md shadow-sm">
        <DatePicker
          className="box-border mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm a"
          timeFormat="HH:mm"
          timeCaption="Time"
          placeholderText={placeholder}
          {...fieldProps}
          selected={value ? new Date(value) : new Date()}
          name={name}
          onChange={(date) => onChange(date.toISOString())}
        />
      </div>
    </div>
  );
};

export default createPlugin({ Component: DateTime });
