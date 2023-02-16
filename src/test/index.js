import React, { useEffect, useState } from "react";
import { Form, CourseDetailPage } from "../lib";
import * as yup from "yup";

export default function TestApp(props) {
  const handleSubmit = (values) => {
    console.log(values);
  };

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
