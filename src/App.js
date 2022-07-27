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
import CourseDetailPageStaging from "./lib/components/course/CourseDetailPageStaging";

const data = {
  categoryId: 3,
  categoryImg: "",
  categoryName: "test",
  certificateImageUrl: "public-assets/c125d0e4-580.jpg",
  cost: null,
  courseId: 12,
  courseImg:
    "https://lms.skillstrainer.in/moodle/pluginfile.php/972/course/overviewfiles/DEO.png",
  description: "This si the demo course we are trying to create",
  digitalContentDuration: "3 hours, 5 live sessions",
  discount: null,
  displayName: "Sample demo course 2",
  isLive: true,
  liveClassDuration: "3 hours, 5 live sessions",
  modules: {
    exception: "dml_missing_record_exception",
    errorcode: "invalidrecord",
    message: "Can't find data record in database table course.",
    debuginfo: "SELECT * FROM {course} WHERE id = ?\n[array (\n  0 => 10,\n)]",
  },
  nsqf_lvl: null,
  partners: [],
  redirection_url:
    "https://moodle.com/wp-content/uploads/2018/07/Moodle_july27-1.png",
  shortName: "Sample demo course 2",
  students_enrolled: undefined,
  videoUrl: "https://adminskillstrainer.s3.ap-south-1.amazonaws.com/null}",
};

function App() {
  const [items, setItems] = useState(data);

  return (
    // <BrowserRouter>
    //   <Switch>
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
    //   </Switch>
    // </BrowserRouter>

    <div>
      <CourseDetailPageStaging
        courseData={items}
        multiLangKey={{}}
        goToCategoryPage={{}}
      />
    </div>
  );
}

export default App;
