import React from "react";

import { createPlugin } from "../utils";

export const TimeInput = ({
  disabled,
  name,
  className,
  onChange,
  value,
  ...props
}) => {
  return (
    <div key={name} className={className}>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          disabled={disabled}
          style={{ boxSizing: "border-box" }}
          className="input-primary"
          type="time"
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={value}
          {...props}
        />
      </div>
    </div>
  );
};

export default createPlugin({
  Component: TimeInput,
});
