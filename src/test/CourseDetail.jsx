import React from "react";
import { courses } from "../testing-data";
import { CourseDetailPage } from "../lib/index";
import { courseFormatter } from "../lib/utils/course";

export default function CourseDetail(props) {
  console.log("Course detail component");
  return (
    <CourseDetailPage
      courseData={courseFormatter(courses[0])}
      multiLangData={{}}
      data={courses[0]}
    />
  );
}
