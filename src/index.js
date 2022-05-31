import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { STRLContextProvider } from "./lib/Context";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <STRLContextProvider
      multiLang={{
        initialData: {
          user1: {
            key: "user1",
            id: 1,
            content: {
              name: "Abhishek Challa",
              age: "21",
            },
          },
          user2: {
            key: "user2",
            id: 2,
            content: {
              name: "Abhishek Challa",
              age: "21",
            },
          },
        },
      }}
    >
      <App />
    </STRLContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
