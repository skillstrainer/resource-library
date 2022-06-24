import "./App.css";
import "./lib/styles.css";
import FormComponent from "./lib/components/form-core";
import { formBuilders } from "./testing-data";
import { useRef } from "react";

function App() {
  const formRef = useRef();

  return (
    <>
      <FormComponent
        formBuilder={formBuilders.Sample}
        onSubmit={(values) => {
          console.log("Final submit function", values);
        }}
        hideSubmit
        ref={formRef}
      />
      <button
        onClick={() => formRef.submit().then(console.log).catch(console.error)}
      >
        Submit
      </button>
    </>
  );
}

export default App;
