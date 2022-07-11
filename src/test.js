import React, { useContext, useState } from "react";
import CourseCard from "./lib/components/course/CourseCard";
import { STRLContext } from "./lib/Context";
import { courses } from "./testing-data";
import { courseFormatter } from "./lib/utils/course";

export default function Test(props) {
  console.log("Test component");
  const {
    dependency: { dependencies },
  } = useContext(STRLContext);
  const { useHistory } = dependencies;

  const history = useHistory();

  return (
    <div>
      <CourseCard
        data={courseFormatter(courses[0])}
        goToDetailPage={() => history.push("/course-detail")}
      />
    </div>
  );
}
