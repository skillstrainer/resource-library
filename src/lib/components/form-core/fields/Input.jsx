import { Field } from "formik";
import React from "react";
import { createPlugin } from "../utils";

export const Input = ({ type, name, className, ...fieldProps }) => {
  return (
    <div key={name} className={`mx-4 ${className}`}>
      <div className="mt-1 relative rounded-md shadow-sm">
        <Field
          name={name}
          type={type}
          autoComplete="new-password"
          {...fieldProps}
          className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 text-sm border-gray-300 rounded-md w-full`}
        />
      </div>
    </div>
  );
};

export default createPlugin({ Component: Input });
