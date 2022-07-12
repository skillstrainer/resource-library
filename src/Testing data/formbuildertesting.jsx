import { useEffect, useState } from "react";
import * as yup from "yup";

const FormBuilder = (values) => {
  const [schema, setSchema] = useState({});

  useEffect(() => {
    const schema = {
      name: {
        type: "text",
        schema: yup
          .string()
          .min(5, "First name must have at least 5 characters"),
        required: true,
        label: "Course Name",
        placeholder: "Course Name",
        className: "",
      },

      short_name: {
        type: "text",
        label: "Short Name",
      },

      partner: {
        type: "select",
        label: "Select Partner",
        required: true,
        options: [
          {
            value: "Pepsico Holdings",
            label: "Pepsico Holdings",
          },
          {
            value: "Rotary International",
            label: "Rotary International",
          },
          {
            value: "Collins Aerospace",
            label: "Collins Aerospace",
          },
          {
            value: "ABC Company",
            label: "ABC Company",
          },
          {
            value: "Honda",
            label: "Honda",
          },
        ],
      },
      project: {
        type: "select",
        label: "Course Category",
        required: true,
        options: [
          {
            value: "Sample Project 1",
            label: "Sample Project 1",
          },
          {
            value: "Sample Project 2",
            label: "Sample Project 2",
          },
          {
            value: "Sample Project 3",
            label: "Sample Project 3",
          },
          {
            value: "Sample Project 4",
            label: "Sample Project 4",
          },
        ],
      },

      description: {
        type: "text-field",
        label: "Description",
        required: true,
      },

      image_url: {
        type: "text",
        label: "Image URL",
        schema: yup.string().url(),
      },

      moodle_url: {
        type: "text",
        label: "Moodle Course URL",
        required: true,
        schema: yup.string().url(),
      },

      moodle_id: {
        type: "text",
        label: "Moodle Course ID",
        required: true,
        schema: yup.string(),
      },

      start_date: {
        type: "date",
        label: "Start Date",
        required: true,
      },

      end_date: {
        type: "date",
        label: "End Date",
        required: true,
      },

      publish: {
        type: "boolean",
        label: "Publish to Dashboard?",
      },
    };

    setSchema(schema);
  }, []);

  return schema;
};

export default FormBuilder;
