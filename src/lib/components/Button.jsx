import _ from "lodash";
import React from "react";

export default function Button(props) {
  return (
    <button
      className={`px-6 py-3 bg-orange-500 text-white rounded-lg ${props.className}`}
      {..._.omit(props, ["className"])}
    />
  );
}
