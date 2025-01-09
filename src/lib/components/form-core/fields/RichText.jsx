import React, { useEffect, useRef } from "react";
import _ from "lodash";
import { createPlugin } from "../utils";

const { CKEditor } =
  typeof window !== "undefined" ? require("@ckeditor/ckeditor5-react") : {};
const ClassicEditor =
  typeof window !== "undefined"
    ? require("@ckeditor/ckeditor5-build-classic")
    : undefined;

export const CKEditorInput = ({
  name,
  className,
  onChange,
  value,
  disabled,
}) => {
  const editorRef = useRef(null);

  const handleChange = (data) => {
    if (typeof onChange === "function") {
      onChange(data);
    }
  };

  useEffect(() => {
    if (editorRef.current && editorRef.current.editor) {
      editorRef.current.editor.isReadOnly = disabled;
    }
  }, [disabled]);

  return (
    <div key={name} className={`${className}`}>
      <CKEditor
        ref={editorRef}
        data={value}
        editor={ClassicEditor}
        onReady={(editor) => {
          editorRef.current = { editor };
          editor.isReadOnly = disabled;
        }}
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
