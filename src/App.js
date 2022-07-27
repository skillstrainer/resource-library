import "./App.css";
import "./lib/styles.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Sidebar } from "./lib";
import { Dropdown } from "./lib";
import { Table } from "./lib";
import { Form } from "./lib";
import DummyData from "./Testing data/DummyData";
import sidebardata from "./Testing data/sidebardata";
import columns from "./Testing data/tabletestingcolumns";
import selects from "./Testing data/dropdowntestingdata";
import FormBuilder from "./Testing data/formbuildertesting";
import Test from "./test";
import CourseDetailPageStaging from "./lib/components/course/CourseDetailPageStaging";

const obj = {
  categoryName: "test",
  categoryId: 3,
  categoryImg: "",
  courseId: 75,
  shortName: "testcoursemalay",
  displayName: "testcoursemalay",
  description: "testcourse",
  courseImg: null,
  students_enrolled: "0",
  isLive: true,
  duration: null,
  nsqf_lvl: null,
  redirection_url: "www.google.com",
  cost: null,
  discount: null,
  modules: {
    exception: "dml_missing_record_exception",
    errorcode: "invalidrecord",
    message: "Can't find data record in database table course.",
    debuginfo:
      "SELECT * FROM {course} WHERE id = ?\n[array (\n  0 => 1222,\n)]",
  },
  partners: [],
  videoUrl: "https://adminskillstrainer.s3.ap-south-1.amazonaws.com/null",
  certificateImageUrl:
    "https://adminskillstrainer.s3.ap-south-1.amazonaws.com/public-assets/958654f4-058.jpg",
  isMoodleCourse: true,
  moodleCourseId: "1222",
};

function App() {
  const [items, setItems] = useState(obj);

  const lang = "";
  const goToCategoryPage = `/courses/${items.categoryId}`;
  const multiLangKey = `page.course.${items.courseId}.${lang}`;

  return (
    // <BrowserRouter>
    //   <Test />
    //   {/* <Switch>
    //     <div className="container">
    //       <div className="flex flex-row ">
    //         <div className="" id="sidenavbar">
    //           <Sidebar sidebarItems={items} setSidebarItems={setItems} />
    //         </div>
    //         <Route path="/create_course">
    //           <div id="form_component" className="ml-4 mr-4 w-full mt-4">
    //             <h1 className="heading-primary">Create Course</h1>
    //             <Form
    //               formBuilder={FormBuilder}
    //               className="mt-2 grid grid-cols-2 gap-x-2"
    //               submitButton={{ text: "Submit", className: "btn-primary" }}
    //             />
    //           </div>
    //         </Route>
    //         <Route path="/manage_course">
    //           <div className="ml-4" id="table">
    //             <Table
    //               columns={columns}
    //               title={"Manage Courses"}
    //               data={DummyData}
    //             />
    //           </div>

    //           <Dropdown selections={selects} title={"Hi User"} />
    //         </Route>
    //       </div>
    //     </div>
    //   </Switch> */}
    // </BrowserRouter>
    <CourseDetailPageStaging
      courseData={items}
      multiLangKey={multiLangKey}
      goToCategoryPage={goToCategoryPage}
    />
  );
}

export default App;
