import React from "react";
import CourseDetailPage from "./lib/components/course/CourseDetailPage";
import { courseCardData } from "./testing-data";
import CourseDetail from "./test/CourseDetail";
import ModalForm from "./test";
import CourseCard from "./lib/components/course/CourseCard";

export default function Test(props) {
  return (
    <div>
      <CourseCard data={courseCardData[0]} />
      {/* <ModalForm /> */}
    </div>
  );
}
