import React, { useContext, useState } from "react";
import { CourseCard, CourseDetailPage, STRLContext } from "./lib";
import { courseFormatter } from "./lib/utils/course";
import { courses } from "./testing-data";

export default function Test(props) {
  return (
    <div className="grid grid-cols-4 p-5">
      {courses.map((course) => (
        <CourseCard data={course} />
      ))}
    </div>
  );
}
