import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import _ from "lodash";
import { createPlugin } from "../utils";

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
