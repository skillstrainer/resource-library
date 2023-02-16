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
          className="input-primary"
        />
      </div>
    </div>
  );
};

export default createPlugin({ Component: Input });
