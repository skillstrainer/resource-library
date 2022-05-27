import React, { createContext, useState } from "react";
import useCourseService from "./services/course";

const STRLService = {};
const STRLContext = createContext();

export function STRLContextProvider(props) {
  const s = STRLService;

  const [courseServices, courseElements] = useCourseService();
  s.course = courseServices;

  const elements = [...courseElements];

  return (
    <STRLContext.Provider>
      {props.children}
      {elements}
    </STRLContext.Provider>
  );
}

export default STRLService;
