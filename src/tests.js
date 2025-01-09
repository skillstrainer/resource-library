import React from "react";
import CourseDetailPage from "./lib/components/course/CourseDetailPage";
import { courseCardData } from "./testing-data";
import CourseDetail from "./test/CourseDetail";
import ModalForm from "./test";
import CourseCard from "./lib/components/course/CourseCard";
import { CourseOverviewAndPurchaseFragment } from "./lib";

export default function Test(props) {
  return (
    <div>
      {/* <CourseCard data={courseCardData[0]} /> */}
      {/* <CourseOverviewAndPurchaseFragment courseData={courseCardData[0]} /> */}
      {/* <CourseDetail /> */}
      <ModalForm />
    </div>
  );
}
