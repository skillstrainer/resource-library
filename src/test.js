import React, { useContext, useState } from "react";
import { CourseCard, STRLContext } from "./lib";
import { courseFormatter } from "./lib/utils/course";
import { courses } from "./testing-data";

export default function Test(props) {
  return (
    <div className="grid grid-cols-3 w-4/5 p-3">
      <CourseCard data={courseFormatter(courses[0])} />
      <CourseCard data={courseFormatter(courses[1])} />
    </div>
  );
}
