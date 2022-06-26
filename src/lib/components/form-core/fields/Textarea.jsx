import { Field } from "formik";
import _ from "lodash";
import React from "react";
import { createPlugin } from "../utils";

export const TextArea = ({ name, className, ...fieldProps }) => {
  return (
    <div key={name} className={className}>
      <div>
        <Field
          style={{ boxSizing: "border-box" }}
          className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          {..._.omit(fieldProps, ["onChange"])}
          name={name}
          as="textarea"
        />
      </div>
    </div>
  );
};

export default createPlugin({ Component: TextArea });
