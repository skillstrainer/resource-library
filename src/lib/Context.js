import React, { createContext } from "react";
import MultiLangContextProvider from "./components/multi-lang/MultiLangContext";
import useCourseService from "./services/course";
import useDependencyService from "./services/dependency";
import useMultiLangService from "./services/mutli-lang";
import useRequestService from "./services/request";
import useToastService from "./services/toast";

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

  // Toast services
  const [toastServices, toastElements] = useToastService(config);
  config.toast = toastServices;

  const elements = [...courseElements, ...multiLangElements, ...toastElements];

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
