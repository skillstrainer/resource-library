import React from "react";
import CourseDetailPage from "./lib/components/course/CourseDetailPage";
import { courses } from "./testing-data";

export default function Test(props) {
  return (
    <div>
      <CourseDetailPage
        courseData={courses[0]}
        goToCategoryPage={() => console.log("Going to category page")}
        payNow={() => console.log("Making payment") || Promise.resolve(false)}
        isPurchased={false}
        viewCourse={() => console.log("Viewing course")}
      />
    </div>
  );
}
