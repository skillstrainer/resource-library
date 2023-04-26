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
        submitButton={{ text: "save", disabled: true }}
        plugins={{
          file: {
            services: {
              uploadFn: (value) =>
                console.log("Getting file for upload", value),
            },
          },
        }}
      />
    </div>
  );
}

const FormBuilder = (values) => {
  const [schema, setSchema] = useState();
  useEffect(() => {
    const schema = {
      file_items: {
        type: "text",
      },
    };
    setSchema(schema);
  }, []);
  return schema;
};
