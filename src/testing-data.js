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
        id: 59,
        course_id: 112,
        partner_id: 23,
        course: {
          __typename: "courses_course",
          id: 112,
          full_name: "fullname ESSCI - In-Store Promoter",
        },
        partner: {},
      },
    ],
    categoryImg: "",
    courseId: 112,
    shortName: "short ESSCI - In-Store Promoter",
    displayName: "dispay ESSCI - In-Store Promoter",
    description:
      "<ul><li>blh blah blah blah</li><li>hey Testing blahh</li><li><strong>Oh yes</strong></li></ul><p><strong>lets try something </strong><i><strong>else</strong></i></p>",
    courseImg:
      "https://lms.skillstrainer.in/moodle/pluginfile.php/1595900/course/overviewfiles/ISP.png",
    students_enrolled: 10000,
    isLive: false,
    duration: "3 Months with 36 One Hour Online Sessions with Trainer",
    nsqf_lvl: "4",
    redirection_url:
      "https://lms.skillstrainer.in/moodle/course/view.php?id=180",
    cost: 0,
    discount: 0,
    isMoodleCourse: true,
    is_subscription: true,
    is_taxable: null,
    moodleCourseId: "180",
    course_type: null,
    has_certificate: false,
    // videoUrl: "https://www.youtube.com/watch?v=g6fnFALEseI",
  },
  {
    id: 126,
    full_name: "Rural Agricultural Work Experience (RAWE) - A",
    image_url: "public-assets/bb06f089-140.png",
  },
];

export const coursePageData = [
  {
    courseData: {
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
            full_name: "fullname ESSCI - In-Store Promoter",
          },
          partner: {},
        },
      ],
      categoryImg: "",
      courseId: 112,
      shortName: "short ESSCI - In-Store Promoter",
      displayName: "dispay ESSCI - In-Store Promoter",
      description:
        "<ul><li>blh blah blah blah</li><li>hey Testing blahh</li><li><strong>Oh yes</strong></li></ul><p><strong>lets try something </strong><i><strong>else</strong></i></p>",
      courseImg:
        "https://lms.skillstrainer.in/moodle/pluginfile.php/1595900/course/overviewfiles/ISP.png",
      students_enrolled: 10000,
      isLive: false,
      duration: "3 Months with 36 One Hour Online Sessions with Trainer",
      nsqf_lvl: "4",
      redirection_url:
        "https://lms.skillstrainer.in/moodle/course/view.php?id=180",
      cost: 999,
      discount: 100,
      isMoodleCourse: true,
      is_subscription: true,
      is_taxable: null,
      moodleCourseId: "180",
      course_type: null,
      has_certificate: false,
      // videoUrl: "https://www.youtube.com/watch?v=g6fnFALEseI",
    },
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
