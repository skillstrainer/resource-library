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
        plugins={{
          file: {
            services: {
              uploadFn: (value) =>
                console.log("Getting file for upload 1", value),
            },
          },
        }}
      />
      <Form
        onSubmit={handleSubmit}
        formBuilder={FormBuilder}
        plugins={{
          file: {
            services: {
              uploadFn: (value) =>
                console.log("Getting file for upload 2", value),
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
      fileField: {
        type: "file",
        label: "Upload",
        schema: yup.array().of(
          yup.object().shape({
            url: yup.string(),
            name: yup.string(),
            id: yup.string().nullable(),
          })
        ),
      },
    };
    setSchema(schema);
  }, []);
  return schema;
};
