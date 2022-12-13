import React, { useEffect, useState } from "react";
import { Form } from "./lib/index";
import * as yup from "yup";
import { FileUploaderPlugin } from "./lib/components/form-ext/plugin-list";

FileUploaderPlugin.services = {
  uploadFn: async (res) => {
    console.log("Main service #1");
  },
};

export default function Test(props) {
  return (
    <div>
      <Form
        formBuilder={FormBuilder2}
        plugins={{
          file: {
            services: {
              uploadFn: (res) => console.log("Main service #2"),
            },
          },
        }}
        onSubmit={async () => {}}
      />
    </div>
  );
}

const FormBuilder1 = (values) => {
  const [schema, setSchema] = useState();

  useEffect(() => {
    const schema = {
      repeatableField: {
        insertable: true,
        label: "Repeatable Field",
        repeat: true,
        required: true,
        type: "object",
        fields: {
          name: {
            schema: yup.string(),
            label: "Name",
          },
          age: {
            schema: yup.number(),
            label: "Age",
          },
        },
      },
      courses: {
        type: "object",
        required: true,
        repeat: true,
        label: "Courses and Revenue Split",
        insertable: true,
        fields: {
          id: {
            type: "hidden",
            schema: yup.string(),
          },
          partner_id: {
            type: "hidden",
            schema: yup.string(),
          },
          course_id: {
            label: "Course",
            type: "select",
            required: true,
            options: [
              { id: 23432, full_name: "Abhishek Challa" },
              { id: 2343343, full_name: "Abhishek Challa 2" },
            ].map((course) => ({
              value: course.id,
              label: course.full_name,
            })),
            schema: yup.string(),
          },
          commission: {
            label: "Partner Commision(%)",
            type: "number",
            required: true,
            schema: yup.number().min(0).max(100),
          },
        },
      },
    };

    setSchema(schema);
  }, []);

  return schema;
};

const FormBuilder2 = (values) => {
  const [schema, setSchema] = useState({});

  useEffect(() => {
    const schema = {
      upload: {
        type: "file",
        label: "Upload file",
        schema: yup.array().of(yup.object().shape({})),
      },
    };

    setSchema(schema);
  }, []);

  return schema;
};
