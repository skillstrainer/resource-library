import React, { useContext } from "react";
import { MultiLangBodyContext } from "../MultiLangBody";
import { MultiLangContext } from "../MultiLangContext";
import _ from "lodash";

export default function useField(props) {
  const { name, defaultValue: dv, children } = props;
  let { content: data, updateField } = useContext(MultiLangBodyContext);
  const { editable } = useContext(MultiLangContext);

  let value = _.get(data, name);

  const defaultValue =
    (typeof dv === "string" && dv) ||
    (Array.isArray(children) ? children.join("\n") : children);

  // Events
  const basicEvents = {
    onFocus: (e) => {
      if (e.target.innerHTML === "_") e.target.innerHTML = "";
    },
    onBlur: (e) => {
      const useValue = ["input", "textarea", "select"].includes(
        e.currentTarget.nodeName.toLowerCase()
      );
      const value = useValue
        ? e.target.value
        : e.target.innerHTML
            .replace(/&nbsp;/g, "")
            .replace(/&amp;/g, "&")
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<");
      updateField(name, value, "onBlur");
      if (value.trim() === "") e.target[useValue ? "value" : "innerHTML"] = "_";
    },
  };

  const events = {
    text: {
      onFocus: basicEvents.onFocus,
      onBlur: basicEvents.onBlur,
    },
  };

  return {
    editable,
    updateField: (value, event) => updateField(name, value, event),
    value,
    defaultValue,
    events: (editable && events) || {},
  };
}
