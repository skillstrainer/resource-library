import React from "react";

export default function Child2(props) {
  console.log("Child 2 updated");

  return <b>{new Date().getTime()}</b>;
}
