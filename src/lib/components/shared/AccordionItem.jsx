import React, { useEffect } from "react";

export const AccordionItem = (props) => {
  const { isActive, toggle, title, children } = props;
  const { isNotToggleItem, onClick } = props;

  useEffect(() => {}, []);

  return (
    <div
      className="flex flex-col w-full"
      style={{ borderBottom: "1px solid var(--orange)" }}
    >
      <div
        className="p-2 flex justify-between cursor-pointer items-center"
        onClick={isNotToggleItem ? onClick : toggle}
      >
        <span className="small-title">{title}</span>
        {isNotToggleItem ? (
          <div>
            <box-icon name="right-arrow-alt" size="sm" />
          </div>
        ) : (
          <div
            style={{
              transform: `rotate(${isActive ? "180" : "0"}deg)`,
              transition: "0.2s",
            }}
          >
            <box-icon name="chevron-down" size="sm" />
          </div>
        )}
      </div>
      <div
        className="w-full"
        style={{
          overflow: "hidden",
          height: isActive ? "auto" : "0",
        }}
      >
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
