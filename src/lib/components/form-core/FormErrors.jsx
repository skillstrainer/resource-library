import React from "react";
import _ from "lodash";

export default function FormErrors({ _key: key, formProps }) {
  const { attemptedSubmit, errors, touched } = formProps;

  const isFieldTouched = _.get(touched, key);
  const fieldErrors = _.get(errors, key) || "";

  return (
    ((isFieldTouched || attemptedSubmit) &&
      fieldErrors &&
      typeof fieldErrors === "string" && (
        <div className="errors text-danger text-red-500">{fieldErrors}</div>
      )) ||
    null
  );
}
