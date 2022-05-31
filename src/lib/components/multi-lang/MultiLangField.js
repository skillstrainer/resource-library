import React from "react";
import _ from "lodash";
import useField from "./utils/useField";
import { disableParents } from "./utils/events";

const MultiLangField = (props) => {
  const {
    editable,
    value,
    defaultValue,
    events: { text: inputTextEvents },
  } = useField(props);

  return (
    <span
      {...inputTextEvents}
      style={{ outline: editable ? "1px solid #333" : "0" }}
      {...(editable
        ? {
            contentEditable: true,
            onPointerDown: disableParents,
            onKeyDown: disableParents,
          }
        : {})}
    >
      {value || defaultValue || (editable ? "_" : "")}
    </span>
  );
};

export default MultiLangField;
