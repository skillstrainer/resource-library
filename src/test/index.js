import React, { useEffect, useState } from "react";
import { Form } from "../lib";
import * as yup from "yup";

function handleSubmit(values) {
  console.log(values);
}

export default function TestApp(props) {
  return (
    <Form
      formBuilder={FormBuilder}
      onSubmit={handleSubmit}
      className="grid grid-cols-3 gap-2"
    />
  );
}

const FormBuilder = (values) => {
  const [schema, setSchema] = useState({});

  useEffect(() => {
    const schema = {
      regular_non_required_non_object: {
        label: "Regular Non Required Non Object",
      },
      regular_non_required_object: {
        type: "object",
        label: "Regular Non Required Object",
        fields: {
          name: {
            label: "Name",
          },
          age: {
            label: "Age",
            type: "number",
          },
        },
      },
      regular_required_non_object: {
        label: "Regular Required Non Object",
        required: true,
      },
      regular_required_object: {
        type: "object",
        label: "Regular Required Object",
        required: true,
        fields: {
          name: {
            label: "Name",
          },
          age: {
            label: "Age",
            type: "number",
          },
        },
      },
      repeatable_agnostic_object_required: {
        type: "object",
        label: "Repeatable Agnostic Object Required",
        required: true,
        repeat: true,
        insertable: true,
        fields: {
          name: {
            label: "Name",
          },
          age: {
            label: "Age",
            type: "number",
          },
        },
      },
      repeatable_agnostic_object_non_required: {
        type: "object",
        label: "Repeatable Agnostic Object Non Required",
        repeat: true,
        insertable: true,
        fields: {
          name: {
            label: "Name",
          },
          age: {
            label: "Age",
            type: "number",
          },
        },
      },
      repeatable_agnostic_non_object_required: {
        label: "Repeatable Agnostic Non Object Required",
        required: true,
        repeat: true,
        insertable: true,
      },
      repeatable_agnostic_non_object_non_required: {
        label: "Repeatable Agnostic Non Object Non Required",
        repeat: true,
        insertable: true,
      },
      repeatable_dependent_object_required: {
        type: "object",
        label: "Repeatable Dependent Object Required",
        required: true,
        repeat: true,
        insertable: true,
        fields: ({ value: item }) => ({
          name: {
            label: "Name with value: " + item?.name,
          },
          age: {
            label: "Age with value: " + item?.age,
            type: "number",
          },
        }),
      },
      repeatable_dependent_object_non_required: {
        type: "object",
        label: "Repeatable Dependent Object Non Required",
        repeat: true,
        insertable: true,
        fields: ({ value: item }) => ({
          name: {
            label: "Name with value: " + item?.name,
          },
          age: {
            label: "Age with value: " + item?.age,
            type: "number",
          },
        }),
      },
      repeatable_dependent_non_object_required: {
        label: "Repeatable Dependent Non Object Required",
        required: true,
        repeat: true,
        insertable: true,
        schema: ({ value }) =>
          isNaN(value)
            ? yup.number("Value should be number")
            : yup.string().matches(/[a-zA-Z]+/, "Value should be alphabetic"),
      },
      repeatable_dependent_non_object_non_required: {
        label: "Repeatable Dependent Non Object Non Required",
        repeat: true,
        insertable: true,
        schema: ({ value }) =>
          isNaN(value)
            ? yup.number().typeError("Value should be number")
            : yup.string().matches(/[a-zA-Z]+/, "Value should be alphabetic"),
      },
    };

    setSchema(schema);
  }, [values]);

  return schema;
};
