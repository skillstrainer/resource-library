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

  useEffect(() => {
    const schema = {
      // name: {
      //   label: "Name",
      // },
      address: {
        label: "Address",
        type: "address",
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
      {/* <Form formBuilder={FormBuilder} /> */}
      {/* <CourseOverviewAndPurchaseFragment courseData={courseCardData[0]} /> */}
    </div>
  );
}
