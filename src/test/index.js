import React, { useEffect, useState } from "react";
import {
  CourseCard,
  CourseDetailPage,
  CourseOverviewAndPurchaseFragment,
  Form,
} from "../lib";
import { courseCardData, coursePageData } from "../testing-data";

async function handleSubmit(values) {
  await new Promise((res) => setTimeout(res, 1000));
  console.log(values);
}

const FormBuilder = (values) => {
  const [schema, setSchema] = useState();
  // // Core fields
  // select: SelectPlugin,
  // textarea: TextareaPlugin,
  // date: DatePlugin,
  // "date-time": DateTimePlugin,
  // boolean: BooleanPlugin,
  // "multi-select": MultiSelectPlugin,
  // input: InputPlugin,
  // "rich-text": RichTextPlugin,
  // time: TimePlugin,

  // // Ext fields
  // file: FileUploaderPlugin,
  // address: AddressPlugin,
  useEffect(() => {
    const schema = {
      // name: {
      //   label: "Name",
      // },
      address: {
        label: "Address",
        type: "rich-text",
        disabled: true,
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
      {/* <CourseOverviewAndPurchaseFragment courseData={courseCardData[0]} /> */}
    </div>
  );
}
