import React, { useEffect, useState } from "react";
import { Form, CourseDetailPage } from "../lib";
import * as yup from "yup";

function handleSubmit(values) {
  console.log(values);
}

export default function TestApp(props) {
  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        formBuilder={FormBuilder}
        submitButton={{ text: "save" }}
      />
    </div>
  );
}

const FormBuilder = (values) => {
  const [schema, setSchema] = useState();
  useEffect(() => {
    const schema = {
      file_items: {
        type: "time",
      },
    };
    setSchema(schema);
  }, []);
  return schema;
};
