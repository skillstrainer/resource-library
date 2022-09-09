import React from "react";
import { useState } from "react";
import ReactSelect from "react-select";
import { createPlugin } from "../utils";

export const MultiSelect = ({
  options = [],
  value,
  onChange,
  className,

  ...selectProps
}) => {
  // set value for default selection

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    e = e.map((option) => option.value);

    if (e.length) {
      if (e[e.length - 1] === "#") e = null;
      else if (e[e.length - 1] === "*") e = options.map((e) => e.value);
    } else e = null;

    onChange(e);
  };

  return (
    <div className={`mt-1 col-span-6 sm:col-span-3 ${className}`}>
      <ReactSelect
        style={{ boxSizing: "border-box" }}
        {...selectProps}
        isMulti
        options={
          options.length === (value || []).length
            ? [{ value: "#", label: "Deselect All" }, ...options]
            : [{ value: "*", label: "Select All" }, ...options]
        }
        value={options.filter(
          (obj) => Array.isArray(value) && value.indexOf(obj.value) > -1
        )}
        onChange={handleChange}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
};

export default createPlugin({
  Component: MultiSelect,
});
