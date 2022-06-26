import { Field } from "formik";
import _ from "lodash";
import React from "react";
import { createPlugin } from "../utils";

export const Select = ({ name, options = [], className, ...fieldProps }) => {
  return (
    <div key={name} className={`col-span-6 sm:col-span-3 ${className}`}>
      <Field
        style={{ boxSizing: "border-box" }}
        {..._.omit(fieldProps, ["onChange"])}
        as="select"
        name={name}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      >
        <option>Choose an option</option>
        {options.map((option, i) => (
          <option className="p-2 font-medium" key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
    </div>
  );
};

export default createPlugin({
  Component: Select,
});
