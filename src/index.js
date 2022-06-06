import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { STRLContextProvider } from "./lib/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <STRLContextProvider request={{ env: "production" }}>
      <App />
    </STRLContextProvider>
  </React.StrictMode>
);
