import React from "react";

export default function SerialableListItem(props) {
  const { children, className, index, moveFn } = props;

  return (
    <div className="flex">
      <div style={{ width: "30px", display: "flex", flexDirection: "column" }}>
        <button onClick={() => moveFn(index, -1)}>Up</button>
        <button onClick={() => moveFn(index, 1)}>Down</button>
      </div>
      <div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
