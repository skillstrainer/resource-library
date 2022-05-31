import React, { createContext, useContext, useEffect, useRef } from "react";
import { MultiLangContext } from "./MultiLangContext";
import _ from "lodash";

export const MultiLangBodyContext = createContext();

export default function MultiLangBody(props) {
  /*
    If context exists: Act as a form
      - Listen to submit signal
      - Fetch data via key
    Else: Act as a template
      - Fetch data via props
  */
  const { _key: key } = props;

  const {
    loadContent,
    submitContent,
    submitSignal,
    isInEditableMode,
    editable,
    data: allData,
    setData: setAllData,
  } = useContext(MultiLangContext);
  const subscriptionRef = useRef();

  const data = props.data || allData[key] || {};
  const setData = (newData, action) => setAllData(key, newData, action);

  useEffect(() => {
    if (isInEditableMode && key)
      loadContent({ key }).then((res) =>
        setData(res || {}, {
          key,
          action: { type: "content.load" },
        })
      );
  }, [key]);

  // Subscribing to submission signal
  useEffect(() => {
    // Re-subscribing with the updated function (with updated closure)
    if (isInEditableMode && key) {
      if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
      subscriptionRef.current = submitSignal.subscribe(() =>
        submitContent({ ...data, key }).then(
          // set the data with the updated data received
          (res) =>
            res &&
            !_.isEmpty(res) &&
            setData(res, { key, action: { type: "content.load" } })
        )
      );
      return () => subscriptionRef.current.unsubscribe();
    }
  }, [key, data, submitContent]);

  // Update field data
  const updateField = (name, value, action) => {
    _.set(data, "content." + name, value);
    setData(
      { ...data },
      {
        key,
        action,
      }
    );
  };

  return (
    <MultiLangBodyContext.Provider
      value={{ content: data.content, updateField, editable }}
    >
      {props.children}
    </MultiLangBodyContext.Provider>
  );
}
