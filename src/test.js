import React, { useEffect, useState } from "react";
import { Form } from "./lib";

export default function Test(props) {
  return (
    <div className="grid grid-cols-4 p-5">
      <Form
        formBuilder={FormBuilder}
        onSubmit={(values) => {
          console.log(values);
        }}
      />
    </div>
  );
}

function FormBuilder(props) {
  const [schema, setSchema] = useState({});

  useEffect(() => {
    setSchema({
      name: {
        type: "text",
        label: "Name",
      },
      gender: {
        type: "select",
        label: "Gender",
        options: [
          {
            label: "Male",
            value: "male",
          },
          {
            label: "Female",
            value: "female",
          },
        ],
      },
      bio: {
        type: "textarea",
        label: "Bio",
      },
      hobbies: {
        type: "multi-select",
        options: [
          {
            label: "Art",
            value: "art",
          },
          {
            label: "Sports",
            value: "sports",
          },
        ],
      },
      address: {
        type: "address",
        label: "Address",
      },
      dob: {
        label: "DOB",
        type: "date",
      },
      does_smoke: {
        label: "Do you smoke?",
        type: "boolean",
      },
      profile_pic: {
        label: "Profile pic",
        type: "file",
      },
      address: {
        label: "Address",
        type: "address",
      },
    });
  }, []);

  return schema;
}
