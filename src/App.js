import "./App.css";
import "./lib/styles.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./lib/components/basic/Sidebar/Sidebar";
import { Dropdown } from "./lib/components/dropdown/Dropdown";
import Table from "./lib/components/basic/Table/Table";
import DummyData from "./Testing data/DummyData";
import sidebardata from "./Testing data/sidebardata";
import { Form } from "./lib";
import columns from "./Testing data/tabletestingcolumns";
import selects from "./Testing data/dropdowntestingdata";
import FormBuilder from "./Testing data/formbuildertesting";

function App() {
  const [items, setItems] = useState(sidebardata);

  return (
    <BrowserRouter>
      <Switch>
        <div className="container">
          <div className="flex flex-row ">
            <div className="" id="sidenavbar">
              <Sidebar sidebarItems={items} setSidebarItems={setItems} />
            </div>
            <Route path="/create_course">
              <div id="form_component" className="ml-4 mr-4 w-full mt-4">
                <h1 className="heading-primary">Create Course</h1>
                <Form
                  formBuilder={FormBuilder}
                  className="mt-2 grid grid-cols-2 gap-x-2"
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

              <Dropdown selections={selects} />
            </Route>
          </div>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
