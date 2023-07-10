import React, { useEffect, useState } from "react";
import { CourseCard, Form } from "../lib";
import { courseCardData } from "../testing-data";

async function handleSubmit(values) {
  await new Promise((res) => setTimeout(res, 1000));
  console.log(values);
}

const FormBuilder = (values) => {
  const [schema, setSchema] = useState();

  useEffect(() => {
    const schema = {
      // name: {
      //   label: "Name",
      // },
      address: {
        label: "Address",
        type: "address",
        keys: {
          action: "include",
          addressDetails: true,
          keys: ["house_number"],
        },
      },
    };
    setSchema(schema);
  }, []);
  return schema;
};

export default function ModalForm() {
  return (
    <div>
      {/* <CourseCard data={courseCardData[0]} /> */}
      <Form formBuilder={FormBuilder} />
    </div>
  );
}
