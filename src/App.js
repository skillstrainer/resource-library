import "./App.css";
import "./lib/styles.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./lib/components/basic/Sidebar";
import Test from "./test";
import CourseDetailPage from "./test/CourseDetail";
import { courseFormatter } from "./lib/utils/course";
import { courses } from "./testing-data";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/course-detail">
          <CourseDetailPage />
        </Route>
        <Route path="/">
          <Test />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
