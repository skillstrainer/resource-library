import React, { useContext, useState } from "react";
import CourseCard from "./lib/components/course/CourseCard";
import { STRLContext } from "./lib/Context";
import { courses, formBuilders } from "./testing-data";
import { courseFormatter } from "./lib/utils/course";
import { Form } from "./lib";

export default function Test(props) {
  console.log("Test component");
  const {
    dependency: { dependencies },
  } = useContext(STRLContext);
  const { useHistory } = dependencies;

  const history = useHistory();

  return (
    <div>
      <Form formBuilder={formBuilders.Sample} />
    </div>
  );
}
