import React, { createContext, useState } from "react";
import MultiLangContextProvider from "./components/multi-lang/MultiLangContext";
import useCourseService from "./services/course";
import useMultiLangService from "./services/mutli-lang";
import useRequestService from "./services/request";

const STRLService = {};
export const STRLContext = createContext();

export function STRLContextProvider(props) {
  const s = STRLService;

  const [config, setConfig] = useState({});

  // Request services
  const [requestServices] = useRequestService(config, setConfig);
  s.request = requestServices;

  // Course services
  const [courseServices, courseElements] = useCourseService(config, setConfig);
  s.course = courseServices;

  // Multi lang services
  const [multiLangServices, multiLangElements] = useMultiLangService(
    config,
    setConfig
  );
  s.multiLang = multiLangServices;

  const elements = [...courseElements, ...multiLangElements];

  return (
    <STRLContext.Provider value={{ config }}>
      <MultiLangContextProvider {...(props.multiLang || {})}>
        {props.children}
        {elements}
      </MultiLangContextProvider>
    </STRLContext.Provider>
  );
}

export default STRLService;
