import { Field } from "formik";
import _ from "lodash";
import React from "react";
import { createPlugin } from "../utils";

export const Input = ({ type, name, className, ...fieldProps }) => {
  return (
    <div key={name} className={`${className}`}>
      <div className="relative rounded-md shadow-sm">
        <Field
          style={{ boxSizing: "border-box" }}
          {..._.omit(fieldProps, ["onChange"])}
          name={name}
          type={type}
          autoComplete="new-password"
          className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>
    </div>
  );
};

export default createPlugin({ Component: Input });
