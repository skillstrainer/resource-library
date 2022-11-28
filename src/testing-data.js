import React, { useEffect, useState } from "react";
import { rNumField, rStringField } from "./lib/components/form-core/presets";
import * as yup from "yup";

export const courseCardData = [
  {
    categoryName: "Communication & Broadcasting",
    categoryId: 22,
    category: {
      __typename: "courses_course_categories",
      id: 22,
      name: "Communication & Broadcasting",
    },
    partners: [
      {
        __typename: "courses_course_partner_certification",
        id: 120,
        course_id: 112,
        partner_id: 23,
        course: {
          __typename: "courses_course",
          id: 112,
          full_name: "ESSCI - In-Store Promoter",
        },
        partner: {
          __typename: "courses_partner",
          id: 23,
          name: "Electronics Sector Skills Council of India (ESSCI) ",
          logo: "data:image/jpeg;base64,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",
        },
      },
      {
        __typename: "courses_course_partner_certification",
        id: 120,
        course_id: 112,
        partner_id: 23,
        course: {
          __typename: "courses_course",
          id: 112,
          full_name: "ESSCI - In-Store Promoter",
        },
        partner: {
          __typename: "courses_partner",
          id: 23,
          name: "Electronics Sector Skills Council of India (ESSCI) ",
          logo: "https://www.essc-india.org/images/logo.png",
        },
      },
    ],
    categoryImg: "",
    courseId: 112,
    shortName: "ESSCI - In-Store Promoter",
    displayName: "ESSCI - In-Store Promoter",
    description: "ESSCI - In-Store Promoter",
    courseImg:
      "https://lms.skillstrainer.in/moodle/pluginfile.php/1595900/course/overviewfiles/ISP.png",
    students_enrolled: 0,
    isLive: false,
    duration: null,
    nsqf_lvl: "4",
    redirection_url:
      "https://lms.skillstrainer.in/moodle/course/view.php?id=180",
    cost: 999,
    discount: null,
    isMoodleCourse: true,
    is_subscription: null,
    is_taxable: null,
    moodleCourseId: "180",
    course_type: null,
    // videoUrl: "https://www.youtube.com/watch?v=g6fnFALEseI",
  },
];

// Form builders
function Sample(values) {
  const [schema, setSchema] = useState();

  useEffect(() => {
    const schema = {
      name: {
        type: "object",
        fields: {
          first: {
            label: "First name",
            schema: yup.string(),
          },
          last: {
            label: "Last name",
            schema: yup.string(),
            required: true,
          },
        },
      },
    };

    setSchema(schema);
  }, [values]);

  return schema;
}

export const formBuilders = {
  Sample,
};
