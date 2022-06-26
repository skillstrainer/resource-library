import "./App.css";
import "./lib/styles.css";
import React, { useRef } from "react";
import FormComponent from "./lib/components/form-core";
import { formBuilders } from "./testing-data";

function App() {
  const formRef = useRef();

  return (
    <div className="box-border w-screen p-4 flex flex-col items-center">
      <FormComponent
        formBuilder={formBuilders.Sample}
        onSubmit={(values) => {
          console.log("Final submit function", values);
        }}
        initValues={{
          name: "Abhishek Challa",
          age: 15,
        }}
        className="grid grid-cols-2 gap-x-4 w-full"
        hideSubmit
        ref={formRef}
      />
      <button onClick={() => formRef.submit()}>Submit</button>
    </div>
  );
}

export default App;
