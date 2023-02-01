import _ from "lodash";
import React from "react";
import { createPlugin } from "../utils";

export const Select = ({ name, options = [], className, ...fieldProps }) => {
  const { formProps } = fieldProps;
  return (
    <div key={name} className={`col-span-6 sm:col-span-3 ${className}`}>
      <select
        style={{ boxSizing: "border-box" }}
        {..._.omit(fieldProps, ["onChange"])}
        name={name}
        className="input-primary"
        onChange={function (e) {
          const value = e.target.value === "" ? undefined : e.target.value;
          formProps.setFieldValue(name, value);
        }}
      >
        <option value="">Choose an option</option>
        {options.map((option, i) => (
          <option className="p-2 font-medium" key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default createPlugin({
  Component: Select,
});
