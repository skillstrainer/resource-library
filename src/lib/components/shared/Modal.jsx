import React from "react";

export default function Modal(props) {
  const { isOpen, onClose, children, noBody, innerContainer } = props;
  const transitionTime = 0.4;

  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        top: "0",
        left: "0",
        transition: transitionTime + "s",
        opacity: isOpen ? "1" : "0",
        pointerEvents: isOpen ? "all" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "arial",
        zIndex: "100",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "rgba(0,0,0,0.5)",
        }}
        onClick={onClose || (() => {})}
      ></div>
      <div
        style={{
          position: "absolute",
          top: isOpen ? "50%" : "45%",
          left: "50%",
          transform: `translateX(-50%) translateY(-50%)`,
          transition: transitionTime + "s",
          maxHeight: "100%",
          overflow: "auto",
          ...(!noBody
            ? {
                background: "#fff",
                padding: "10px",
                minWidth: "300px",
              }
            : {}),
          ...(innerContainer?.style || {}),
        }}
        className={innerContainer?.className}
      >
        {!noBody && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-1 mr-1 h-9 w-9 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={onClose || (() => {})}
              style={{ height: "1.5rem", width: "1.5rem" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
