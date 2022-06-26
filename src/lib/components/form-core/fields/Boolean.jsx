import React from "react";
import { createPlugin } from "../utils";

export const Boolean = ({
  name,
  value,
  onChange,
  trueLabel = "True",
  falseLabel = "False",
  className,
}) => {
  return (
    <div key={name} className={`my-1 ${className}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-7 w-7 text-orange focus:ring-0 focus:ring-offset-0 focus:border-0 rounded"
          onChange={(e) => onChange(e.target.checked)}
          checked={value}
        />
        <label
          htmlFor="comments"
          className="ml-3 text-sm font-medium text-japanese_indigo"
        >
          {value ? trueLabel : falseLabel}
        </label>
      </div>
    </div>
  );
};

export default createPlugin({
  Component: Boolean,
});
