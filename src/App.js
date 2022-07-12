import "./App.css";
import "./lib/styles.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./lib/components/basic/Sidebar/Sidebar";
import { AiOutlinePlus, AiTwotoneSetting } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdSettingsApplications } from "react-icons/md";
import { AiFillPlusSquare } from "react-icons/ai";
import { Dropdown } from "./lib/components/dropdown/Dropdown";
import Table from "./lib/components/basic/Table/Table";
import DummyData from "./lib/components/basic/Table/DummyData";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Form } from "./lib";

const FormBuilder = (values) => {
  const [schema, setSchema] = useState({});

  useEffect(() => {
    const schema = {
      name: {
        type: "object",
        fields: {
          first: {
            schema: yup.string(),
            required: true,
            label: "First Name",
            placeholder: "First Name",
          },
          last: {
            schema: yup.string(),
            required: true,
            label: "Last Name",
            placeholder: "Second Name",
          },
        },
      },

      email: {
        type: "string",
        label: "Email",
        schema: yup.string(),
        required: true,
        placeholder: "Email",
      },

      partner: {
        type: "select",
        label: "Select Partner",
        required: true,
        placeholder: "",
      },
    };

    setSchema(schema);
  }, []);

  return schema;
};

function App() {
  const selects = [
    {
      name: "Settings",
      url: "/settings",
    },
    {
      name: "Logout",
      onClick1() {
        alert("Blah BLah");
      },
    },
  ];

  const [items, setItems] = useState({
    active: 0,
    items: [
      {
        name: "Manage Course",
        key: "manage_course",
        url: "manage_course",
        Component: <h1>This is a sample component</h1>,
        icon: MdSettingsApplications,
      },
      {
        name: "Create Course",
        key: "create_course",
        url: "create_course",
        Component: <h1>This is a sample component</h1>,
        icon: AiFillPlusSquare,
      },
      {
        name: "Update Course",
        key: "update_course",
        url: "update_course",
        Component: <h1>This is a sample component</h1>,
        icon: AiFillPlusSquare,
      },
      {
        name: "Course Categories",
        key: "course_categories",
        url: "course_categories",
        Component: <h1>This is a sample component</h1>,
        icon: BiCategoryAlt,
      },
      {
        name: "Edit Moodle Configuration",
        key: "moodle_manage",
        url: "moodle_manage",
        Component: <h1>This is a sample component</h1>,
        icon: FiEdit,
      },
    ],
  });

  const columns = [
    {
      id: 1,
      name: "Course ID",
      selector: (row) => row.CourseID,
      sortable: true,
      reorder: true,
      wrap: true,
    },
    {
      id: 2,
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
      reorder: true,
      wrap: true,
    },
    {
      id: 3,
      name: "Category",
      selector: (row) => row.Category,
      sortable: true,
      reorder: true,
      wrap: true,
    },
    {
      id: 4,
      name: "Description",
      selector: (row) => row.Description,
      sortable: true,
      reorder: true,
      wrap: true,
    },
    {
      cell: (row) => (
        <Link to={"#"}>
          <button className="btn-secondary ml-0 ">Edit</button>
        </Link>
      ),
      width: "68px",
      ignoreRowClick: true,
      allowOverflow: false,
      button: true,
    },
    {
      cell: (row) => (
        <Link to={"#"}>
          <button className="btn-secondary ml-0 ">View</button>
        </Link>
      ),
      width: "68px",
      ignoreRowClick: true,
      allowOverflow: false,
      button: true,
    },
  ];

  return (
    <BrowserRouter>
      <Switch>
        {/* 
        <Route path="/">
          <Sidebar sidebarItems={items} setSidebarItems={setItems} />
        </Route> */}
        {/* <Route>
          <Dropdown selections={selects} />
        </Route> */}
        {/* <Route>
          <Table column={columns} title={"Manage Courses"} data={DummyData} />
        </Route> */}
        <div className="container">
          <div className="flex flex-row">
            <div className="" id="sidenavbar">
              <Sidebar sidebarItems={items} setSidebarItems={setItems} />
            </div>
            <Route path="/create_course">
              <div id="form_component">
                <h1 className="ml-4 mt-4 heading-primary">Create Trainee</h1>
                <Form
                  formBuilder={FormBuilder}
                  className="ml-4"
                  submitButton={{ text: "Submit", className: "btn-primary" }}
                />
              </div>
            </Route>
            <Route path="/manage_course">
              <div className="ml-4" id="table">
                <Table
                  column={columns}
                  title={"Manage Courses"}
                  data={DummyData}
                />
              </div>
            </Route>
          </div>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
