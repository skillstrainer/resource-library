import React from "react";
import CourseCard from "./lib/components/course/CourseCard";
import { courseCardData } from "./testing-data";

export default function Test(props) {
  return (
    <div>
      <CourseCard
        data={courseCardData[0]}
        openCourse={() => console.log("Open Course")}
        onBookDemo={() => console.log("Book a Demo")}
      />
    </div>
  );
}
