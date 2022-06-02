import React, { createContext, useState } from "react";
import Child1 from "./Child1";

const context = createContext();

const children = <Child1 />;

export default function TestApp(props) {
  const [count, setCount] = useState(0);
  window.update = () => setCount(count + 1);

  console.log(count);

  return <div>{children}</div>;
}
