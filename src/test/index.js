import React, { useEffect, useState } from "react";
import { Form } from "../lib";

async function handleSubmit(values) {
  await new Promise((res) => setTimeout(res, 1000));
  console.log(values);
}

const FormBuilder = (values) => {
  const [schema, setSchema] = useState();

  useEffect(() => {
    const schema = {
      name: {
        label: "Name",
      },
    };
    setSchema(schema);
  }, []);
  return schema;
};

export default function ModalForm() {
  return (
    <div>
      <Form formBuilder={FormBuilder} onSubmit={handleSubmit} />
    </div>
  );
}
