import React from "react";
import Section from "./Section";
import _ from "lodash";

const FormField = (props) => {
  const { formProps, name: key, field } = props;
  const { values, setFieldValue, plugins, attemptedSubmit } = formProps;

  let value = _.get(values, key) || "";

  const { type } = field;
  const plugin = type !== "object" && (plugins[type] || plugins.input);

  return (
    <div className="w-full">
      {plugin && plugin.Component ? (
        <plugin.Component
          name={key}
          value={value}
          onChange={(val) => {
            setFieldValue(key, val);
          }}
          {...field}
          pluginContext={plugin}
          formProps={formProps}
        />
      ) : type === "object" ? (
        <Section
          fields={field.fields}
          formProps={formProps}
          prefix={key}
          className="input w-full"
        />
      ) : null}
    </div>
  );
};

export default FormField;
