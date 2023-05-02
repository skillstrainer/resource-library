import React from "react";
import CourseDetailPage from "./lib/components/course/CourseDetailPage";
import { courseCardData } from "./testing-data";

export default function Test(props) {
  return (
    <div>
      <CourseDetailPage
        courseData={courseCardData[0]}
        openCourse={() => console.log("Open Course")}
        onBookDemo={() => console.log("Book a Demo")}
      />
    </div>
  );
}
