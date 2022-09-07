import "./App.css";
import "./lib/styles.css";
import React, { useState } from "react";
import { CourseCard, CourseDetailPage } from "./lib/index";
import { courses } from "./testing-data";

function App() {
  return (
    <div className="p-4">
      <CourseDetailPage courseData={courses[0]} />
    </div>
  );
}

export default App;
