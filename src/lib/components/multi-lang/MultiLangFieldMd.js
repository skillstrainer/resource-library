import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import useField from "./utils/useField";

export default function MultiLangFieldMd(props) {
  const {
    editable,
    value,
    defaultValue,
    events: { text: inputTextEvents },
  } = useField(props);
  const { editor } = props;

  const [editing, setEditing] = useState();

  const textareaRef = useRef();

  return (
    <>
      <textarea
        onFocus={(e) => {
          setEditing(true);
          inputTextEvents.onFocus(e);
          e.currentTarget.value = value || defaultValue || "_";
        }}
        onBlur={(e) => {
          setEditing();
          inputTextEvents.onBlur(e);
        }}
        defaultValue={value || defaultValue || "_"}
        style={
          editable && editing
            ? {
                width: "100%",
                height: "auto",
                ...(editor?.dims || {}),
              }
            : {
                height: "0",
                width: "0",
              }
        }
        ref={textareaRef}
      />
      <div
        style={
          editable && editing
            ? {
                width: "0",
                height: "0",
                overflow: "hidden",
              }
            : editable
            ? {
                border: "1px solid #000",
              }
            : {
                height: "auto",
                width: "auto",
              }
        }
        onClick={() => editable && textareaRef.current.focus()}
        className="anti-tailwind"
      >
        <ReactMarkdown children={value || defaultValue} />
      </div>
    </>
  );
}
