import React from "react";
import _ from "lodash";
import { createPlugin } from "../utils";

const { CKEditor } =
  typeof window !== "undefined" ? require("@ckeditor/ckeditor5-react") : {};
const ClassicEditor =
  typeof window !== "undefined"
    ? require("@ckeditor/ckeditor5-build-classic")
    : undefined;

export const CKEditorInput = ({ name, className, onChange, value }) => {
  const handleChange = (data) => {
    if (typeof onChange === "function") {
      onChange(data);
    }
  };

  return (
    <div key={name} className={`${className}`}>
      <CKEditor
        data={value}
        editor={ClassicEditor}
        onChange={(event, editor) => {
          const data = editor.getData();
          handleChange(data);
        }}
      />
    </div>
  );
};

export default createPlugin({
  Component: CKEditorInput,
});
