import React, { createContext, useState } from "react";
import useCourseService from "./services/course";

const STRLService = {};
export const STRLContext = createContext();

export function STRLContextProvider(props) {
  const s = STRLService;

  const [config, setConfig] = useState({
    auth: {},
    course: {},
  });
  s.getConfig = () => config;
  s.updateConfig = (delta = {}) => setConfig({ ...config, ...delta });

  const [courseServices, courseElements] = useCourseService(config);
  s.course = courseServices;

  const elements = [...courseElements];

  return (
    <STRLContext.Provider value={{ config }}>
      {props.children}
      {elements}
    </STRLContext.Provider>
  );
}

export default STRLService;
