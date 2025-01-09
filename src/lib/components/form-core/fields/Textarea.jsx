import { Field } from "formik";
import _ from "lodash";
import React from "react";
import { createPlugin } from "../utils";

export const TextArea = ({ disabled, name, className, ...fieldProps }) => {
  return (
    <div key={name} className={className}>
      <div>
        <Field
          disabled={disabled}
          style={{ boxSizing: "border-box" }}
          className="input-primary"
          {..._.omit(fieldProps, ["onChange"])}
          name={name}
          as="textarea"
        />
      </div>
    </div>
  );
};

export default createPlugin({ Component: TextArea });
