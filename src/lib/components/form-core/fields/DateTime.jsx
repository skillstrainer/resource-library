import React from "react";
import { createPlugin } from "../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DateTime = ({
  disabled,
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
          disabled={disabled}
          className="input-primary"
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
