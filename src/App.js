import "./App.css";
import "./lib/styles.css";
import React, { useState } from "react";
import { courses } from "./testing-data";
import { MultiSelect } from "./lib/components/form-core/fields/MultiSelect";
import { FormFields } from "./lib";
import Test from "./test";

function App() {
  // const [select, setSelect] = useState([]);
  const [addressValue, setAddressValue] = useState();

  return (
    <div className="p-4">
      <Test />
    </div>
  );
}

export default App;
