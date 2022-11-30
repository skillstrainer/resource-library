import React, { useEffect, useState } from "react";
import { Form } from "./lib/index";
import * as yup from "yup";

export default function Test(props) {
  return (
    <div>
      <Form formBuilder={FormBuilder} />
    </div>
  );
}

const FormBuilder = (values) => {
  const [schema, setSchema] = useState();

  useEffect(() => {
    const schema = {
      repeatableField: {
        insertable: true,
        label: "Repeatable Field",
        repeat: true,
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
    };

    setSchema(schema);
  }, []);

  return schema;
};
