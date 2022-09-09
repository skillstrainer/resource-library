import "./App.css";
import "./lib/styles.css";
import React, { useState } from "react";
import { courses } from "./testing-data";
import { MultiSelect } from "./lib/components/form-core/fields/MultiSelect";
import { FormFields } from "./lib";

function App() {
  // const [select, setSelect] = useState([]);
  const [addressValue, setAddressValue] = useState();

  return (
    <div className="p-4">
      {/* <MultiSelect
        value={select}
        onChange={(value) => setSelect(value)}
        options={courses.map((course) => ({
          label: course.displayName,
          value: course.courseId,
        }))}
      />
      {console.log(select)} */}
      <FormFields.AddressField
        onChange={setAddressValue}
        value={addressValue}
      />
    </div>
  );
}

export default App;
