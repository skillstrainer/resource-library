import React from "react";
import { courses } from "../testing-data";
import { CourseDetailPage } from "../lib/index";

import { courseFormatter } from "../lib/utils/course";

export default function CourseDetail(props) {
  return (
    <CourseDetailPage
      courseData={{
        ...courseFormatter(courses[0]),
        isDemoAvailable: true,
      }}
      multiLangData={{}}
      data={courses[0]}
    />
  );
}
