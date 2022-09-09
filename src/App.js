import "./App.css";
import "./lib/styles.css";
import React, { useState } from "react";
import { CourseCard, CourseDetailPage } from "./lib/index";
import { courses } from "./testing-data";
import { MultiSelect } from "./lib/components/form-core/fields/MultiSelect";

function App() {
  const [select, setSelect] = useState([]);
  return (
    <div className="p-4">
      <MultiSelect
        value={select}
        onChange={(value) => setSelect(value)}
        options={courses.map((course) => ({
          label: course.displayName,
          value: course.courseId,
        }))}
      />
      {console.log(select)}
    </div>
  );
}

export default App;
