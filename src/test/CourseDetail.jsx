import React from "react";
import { courseCardData } from "../testing-data";
import { CourseDetailPage } from "../lib/index";

import { courseFormatter } from "../lib/utils/course";

export default function CourseDetail(props) {
  return (
    <CourseDetailPage
      courseData={{
        ...courseFormatter(courseCardData[0]),
        isDemoAvailable: true,
      }}
      multiLangData={{}}
      data={courseCardData[0]}
    />
  );
}
