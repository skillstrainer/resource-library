import React, { useEffect, useState } from "react";
import { rNumField, rStringField } from "./lib/components/form-core/presets";
import * as yup from "yup";

export const courses = [
  {
    id: 53,
    full_name: "New course",
    description: "description",
    start_date: "2022-01-01T00:00:00+00:00",
    end_date: "2025-12-31T00:00:00+00:00",
    moodle_config_id: 6,
    moodle_course_url: "google.com",
    course_category: {
      id: 45,
      name: "adsa",
      description: "",
      visible: false,
      created_at: "2022-01-15T07:59:32.261754+00:00",
      updated_at: "2022-01-15T07:59:32.261754+00:00",
      slug: "adsa",
      image_url: null,
      moodle_category_id: null,
    },
    publish: false,
    is_moodle_course: false,
    created_at: "2022-07-08T05:49:06.353631+00:00",
    updated_at: "2022-07-08T06:12:36.838634+00:00",
    identifier: "new-course",
    cost: null,
    nsqf_level: null,
    discount: null,
    multilang: null,
    image_url: null,
    short_name: null,
    moodle_course_id: "123",
    duration: "3 hours",
    is_live_course: false,
    course_partner: null,
    video_url:
      "https://adminskillstrainer.s3.ap-south-1.amazonaws.com/public-videos/d104fddd-3ed.mp4",
  },
  {
    id: 12,
    full_name: "Social Media Management (For Trainers)",
    description: "Social Media Management (For Trainers)",
    start_date: "2021-12-29T00:00:00+00:00",
    end_date: "2031-01-01T00:00:00+00:00",
    moodle_config_id: 6,
    moodle_course_url:
      "https://lms.skillstrainer.in/moodle/course/view.php?id=124",
    course_category: {
      id: 4,
      name: "Automobile",
      description: "",
      visible: true,
      created_at: "2021-12-29T08:05:42.200725+00:00",
      updated_at: "2022-01-23T14:10:34.528223+00:00",
      slug: "automobile",
      image_url:
        "https://skillstrainer-api.s3.amazonaws.com/medium_Automobile_5b204d6968.png",
      moodle_category_id: null,
    },
    publish: true,
    is_moodle_course: true,
    created_at: "2021-12-29T08:39:03.535125+00:00",
    updated_at: "2022-04-27T11:56:24.758142+00:00",
    identifier: "social-media-management-(for-trainers)",
    cost: 4999,
    nsqf_level: "6",
    discount: null,
    multilang: null,
    image_url:
      "https://lms.skillstrainer.in/moodle/pluginfile.php/585710/course/overviewfiles/SMM.png",
    short_name: "Social Media Management (For Trainers)",
    moodle_course_id: "124",
    duration: "12",
    is_live_course: null,
    course_partners: [],
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
