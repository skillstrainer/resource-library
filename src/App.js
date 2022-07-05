import "./App.css";
import "./lib/styles.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./lib/components/basic/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Sidebar setSidebarItems={() => {}} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
