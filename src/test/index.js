import React, { useCallback, useContext, useEffect, useState } from "react";
import { Form } from "../lib";
import * as yup from "yup";
import { STRLContext } from "../lib/Context";

function handleSubmit(values) {
  console.log(values);
}

const FormBuilder = (values) => {
  const [schema, setSchema] = useState();

  useEffect(() => {
    const schema = {
      file_upload: {
        type: "file",
        showCaptureButton: true,
        label: "Upload file",
        schema: yup.array().of(yup.object()).required(),
      },
    };
    setSchema(schema);
  }, []);
  return schema;
};

export default function TestApp(props) {
  const { toast } = useContext(STRLContext);

  const openFormModal = useCallback(async () => {
    const formValues = await toast.prompt(ModalForm, {});
    console.log(formValues);
  }, [toast]);

  return (
    <div>
      <button onClick={openFormModal} className="btn-primary">
        Open form modal
      </button>
    </div>
  );
}

function ModalForm() {
  return (
    <div>
      <Form
        formBuilder={FormBuilder}
        plugins={{
          file: {
            services: {
              uploadFn: (file) =>
                console.log("Uploading file") ||
                Promise.resolve(file.name + ".jpg"),
            },
          },
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
