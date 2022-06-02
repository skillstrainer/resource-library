import React from "react";
import Child2 from "./Child2";

export default function Child1(props) {
  console.log("Child 1 updated");

  return (
    <div>
      <Child2 />
    </div>
  );
}
