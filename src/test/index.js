import React, { useEffect, useState } from "react";
import { Form, CourseDetailPage } from "../lib";
import * as yup from "yup";

function handleSubmit(values) {
  console.log(values);
}

const FormBuilder = (values) => {
  const [schema, setSchema] = useState();
  useEffect(() => {
    const schema = {
      richText: {
        type: "rich-text",
        label: "Rich Text",
      },
    };
    setSchema(schema);
  }, []);
  return schema;
};

export default function TestApp(props) {
  return <Form formBuilder={FormBuilder} onSubmit={handleSubmit} />;
}
