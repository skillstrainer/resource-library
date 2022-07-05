import React, { createContext } from "react";
import { Router, Switch } from "react-router-dom";
import MultiLangContextProvider from "./components/multi-lang/MultiLangContext";
import useCourseService from "./services/course";
import useDependencyService from "./services/dependency";
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
      dependencies: props.dependencies,
    };

  // Dependency services
  const [dependencyServices] = useDependencyService(config);
  config.dependency = dependencyServices;

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
