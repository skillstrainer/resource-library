import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { STRLContextProvider } from "./lib/Context";

const jwtToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJjZGExNDdlMC00NTNjLTRjNzctODQwMS1jMGQ0MWMyOWViNGMiLCJpYXQiOjE2NTQ1MDA5NzEsImV4cCI6MTY1NDUwODE3MSwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbmlzdHJhdG9yIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluaXN0cmF0b3IiLCJ4LWhhc3VyYS11c2VyLWlkIjoiMSIsIngtaGFzdXJhLXJvbGUiOiJhZG1pbmlzdHJhdG9yIn19.H6ymSBqr9064Pa-GT9XCcViwB1ab7t-7XzcJmMScUTrP0o9Y3yiDI9JuQKHtYZmM0fT2mq1NJmpXujdeYGxkLoZMNIf9nmmVjYjdda0KU8ff69okLDbxTbeCDuIThDpoweyPAwsf4_1FduyRKo1PSZL1d2c7YlHU4zOhRW1k9n1_a7JalvMTnZUpTkgifpyLAR8JX_8LDsSUTomtenc-2gpkFZ1N8hWIolfr-tMlBtUQ6ht0a69tzKx889yxL1B-MYMFwbL268zY_p1bK4lYvVg42zu61ee9PwdVp5CNU1q32JMp31nLUBIo8oqmpwwlyTSVQajJJoehdcnEvjdtog",
  accessToken = "60f794e7-4663-3af7-be52-75fc2aca098e";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <STRLContextProvider request={{ env: "production", jwtToken, accessToken }}>
      <App />
    </STRLContextProvider>
  </React.StrictMode>
);
