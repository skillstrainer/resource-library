import React, { useEffect, useState } from "react";
import { Form } from "../lib";
import * as yup from "yup";

export default function TestApp(props) {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form
      formBuilder={FormBuilder}
      onSubmit={handleSubmit}
      className="grid grid-cols-3 gap-2"
    />
  );
}

const courses = [
  {
    id: 1,
    full_name: "Course 1",
  },
  {
    id: 2,
    full_name: "Course 2",
  },
  {
    id: 3,
    full_name: "Course 3",
  },
];

const FormBuilder = (values) => {
  const [schema, setSchema] = useState({});

  useEffect(() => {
    const schema = {
      name: {
        label: "Name",
        required: true,
      },
      courses: {
        type: "object",
        label: "Courses and Revenue Split",
        repeat: true,
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
            options: courses.map((course) => ({
              value: course.id,
              label: course.full_name,
            })),
            schema: yup.string(),
          },
          commission: {
            label: "Partner Commission (%)",
            type: "number",
            schema: yup.number().min(0).max(100),
          },
        },
      },
    };

    setSchema(schema);
  }, []);

  return schema;
};
