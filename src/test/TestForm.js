import React from "react";
import { Form } from "../lib";
import CreateUpdateFormBuilder from "./CreateUpdateFormBuilder"; 

function TestForm() {
  const initialValues = {}; 

  const handleSubmit = (values) => {
 
    console.log("Submitted values:", values);
    
  };

  const formSchema = CreateUpdateFormBuilder(initialValues);

  return (
    <Form
      formBuilder={CreateUpdateFormBuilder}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      className="ml-6 mt-2 grid grid-cols-2 gap-x-2"
      submitButton={{
        text: "Save",
        className:
          "btn-primary bg-orange text-sm font-semibold text-white rounded-md px-6",
      }}
    />
  );
}

export default TestForm;
