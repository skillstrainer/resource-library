import { useState, useEffect, useMemo } from "react";
import { Form } from "../lib";
import * as yup from "yup";

function CreateUpdateFormBuilder(values) {
  const [schema, setSchema] = useState({});
  
  const courseCategoryData = {
    courses_course_categories: [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
      { id: 3, name: "Category 3" },
    ],
  };

  const memoizedSchema = useMemo(() => {
    return {
      full_name: {
        type: "text",
        label: "Full Name",
        required: true,
        schema: yup.string(),
      },
      course_category_id: {
        type: "select",
        label: "Course Category",
        required: true,
        options: courseCategoryData?.courses_course_categories.map((course) => ({
          value: course.id,
          label: course.name,
        })) || [],
      },
      description: {
        type: "rich-text",
        label: "Description",
        schema: yup.string(),
      },
      short_name: {
        type: "text",
        label: "Short Name",
        schema: yup.string(),
      },
      course_type: {
        type: "select",
        label: "Course Type",
        required: true,
        options: [
          { label: "Digital Content", value: "1" },
          { label: "Live Online Classes + Digital Content", value: "2" },
          {
            label: "Physical Classes+Live Online Classes+Digital Content",
            value: "3",
          },
        ],
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
        type: "select",
        label: "Publish Course",
        options: [
          { label: "Save in Draft", value: false },
          { label: "Publish", value: true },
        ],
      },
      course_instructions: {
        type: "rich-text",
        label: "Course Instructions",
      },
    };
  }, [courseCategoryData]);

  useEffect(() => {
    setSchema(memoizedSchema);
  }, [memoizedSchema]);

  return schema;
}

export default CreateUpdateFormBuilder;
