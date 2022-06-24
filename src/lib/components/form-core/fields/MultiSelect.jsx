import React from "react";
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
  const handleChange = (e) =>
    onChange(Array.isArray(e) ? e.map((x) => x.value) : []);

  return (
    <div className={`col-span-6 sm:col-span-3 mx-4 ${className}`}>
      <ReactSelect
        {...selectProps}
        isMulti
        options={options}
        value={options.filter((obj) => value === obj.value)}
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
