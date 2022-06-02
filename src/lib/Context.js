import React, { createContext, useState } from "react";
import MultiLangContextProvider from "./components/multi-lang/MultiLangContext";
import useCourseService from "./services/course";
import useMultiLangService from "./services/mutli-lang";
import useRequestService from "./services/request";

export const STRLContext = createContext();

let config;
export function STRLContextProvider(props) {
  if (!config)
    config = {
      multiLang: props.multiLang,
      course: props.course,
      request: props.request,
    };
  // Request services
  const [requestServices] = useRequestService(config);
  config.request = requestServices;

  // Course services
  const [courseServices, courseElements] = useCourseService(config);
  config.course = courseServices;

  // Multi lang services
  const [multiLangServices, multiLangElements] = useMultiLangService(config);
  config.multiLang = multiLangServices;

  const elements = [...courseElements, ...multiLangElements];

  return (
    <STRLContext.Provider
      value={{
        ...config,
      }}
    >
      <MultiLangContextProvider {...(props.multiLang || {})}>
        {props.children}
        {elements}
      </MultiLangContextProvider>
    </STRLContext.Provider>
  );
}
