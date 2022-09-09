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
    if (e[e.length - 1]?.value === "#") {
      onChange([]);
      setSelectedAll(false);
    } else {
      if (e[0]?.value === "*" || e[e.length - 1]?.value === "*") {
        onChange(options.map((x) => x.value));
        setSelectedAll(true);
      } else onChange(Array.isArray(e) ? e.map((x) => x.value) : []);
    }
  };

  const [selectedAll, setSelectedAll] = useState(false);

  return (
    <div className={`mt-1 col-span-6 sm:col-span-3 ${className}`}>
      <ReactSelect
        style={{ boxSizing: "border-box" }}
        {...selectProps}
        isMulti
        options={
          selectedAll
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
