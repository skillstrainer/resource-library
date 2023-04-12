import React, { useEffect, useState } from "react";
import { Form, CourseDetailPage } from "../lib";
import * as yup from "yup";

function handleSubmit(values) {
  console.log(values);
}

export default function TestApp(props) {
  const courseData = {
    __typename: "courses_course",
    id: 89,
    full_name: "Demo Palinfocom course",
    description:
      "Sample Psychrometric Test for Vocational, Skilling Courses\n\nName: ____________________________ Date: ___________\n1. Age: ________\n\n2. Gender: Male / Female\n3. Occupation: _______________\n\nInstructions:\n1. This test is designed to assess your aptitude for vocational and skilling courses.\n2. The test consists of 20 multiple-choice questions.\n3. Each question has four options. Select the option that you think is most correct.\n4. There is one hour time limit for this test.\n5. Once you have completed the test, submit it for grading.",
    start_date: "2022-01-24T00:00:00+00:00",
    end_date: "2025-10-24T00:00:00+00:00",
    moodle_config_id: null,
    moodle_course_url: null,
    course_category: {
      __typename: "courses_course_categories",
      id: 1,
      name: "Horticulture Test",
    },
    publish: true,
    is_moodle_course: false,
    created_at: "2022-01-24T11:04:18.40654+00:00",
    updated_at: "2023-02-16T06:22:25.914794+00:00",
    identifier: "demo-palinfocom-course",
    cost: 10,
    nsqf_level: null,
    discount: null,
    multilang: null,
    image_url: "public-assets/05bd0859-dd5.png",
    short_name: "Demo Palinfocom course",
    certificate_image_url:
      "https://adminskillstrainerprod.s3.ap-south-1.amazonaws.com/public-assets/5630fc2d-f3f.png",
    moodle_course_id: null,
    duration: "10",
    is_live_course: false,
    is_subscription: false,
    is_taxable: false,
    course_type: null,
    partners: [],
    course_subscription_relation_array: [],
    tax_relation: null,
    demo_batches: [],
    students_enrolled: 3,
    modules: [],
  };

  return (
    <CourseDetailPage courseData={courseData} />
    // <Form
    //   formBuilder={FormBuilder}
    //   onSubmit={handleSubmit}
    //   className="grid grid-cols-3 gap-2"
    // />
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
