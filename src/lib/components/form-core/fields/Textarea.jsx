import { Field } from "formik";
import React from "react";
import { createPlugin } from "../utils";

export const TextArea = ({ name, className, ...fieldProps }) => {
  return (
    <div key={name} lassName={`mx-4 ${className}`}>
      <div className="mt-1">
        <Field
          name={name}
          as="textarea"
          {...fieldProps}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full text-sm border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default createPlugin({ Component: TextArea });
