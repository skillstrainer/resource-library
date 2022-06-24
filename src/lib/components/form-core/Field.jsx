import React, { useRef } from "react";
import Section from "./Section";
import _ from "lodash";

export default (props) => {
  const { formProps, name: key, field } = props;
  const {
    // handleChange,
    // handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    plugins,
    attemptedSubmit,
  } = formProps;

  let value = _.get(values, key) || "";

  const { type } = field;
  const plugin = plugins[type] || plugins.input;

  // Correcting value for date type
  // if (type === "date") value = moment(value).format("YYYY-MM-DD");

  // const fieldRef = useRef(null);
  // const onChangeWrapped = (e) => {
  //   if (!block) {
  //     let value = e.target.value;

  //     // Correcting value for date type
  //     if (type === "date") value = new Date(value).toISOString();

  //     // Setting value from input
  //     if (onChange) onChange(value);
  //     handleChange(e);
  //   } else {
  //     // Setting value after block
  //     setFieldValue(key, formattedValue);
  //   }
  // };
  // formProps.onChangeWrapped = onChangeWrapped;

  return (
    <>
      <div className="w-full">
        {
          plugin && plugin.Component ? (
            <plugin.Component
              name={key}
              value={value}
              onChange={(val) => setFieldValue(key, val)}
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
          ) : null
          // : type === "select" ? (
          //   <Field
          //     as="select"
          //     className="input w-full"
          //     name={key}
          //     onChange={onChangeWrapped}
          //     value={value}
          //   >
          //     <option value="">Choose an option</option>
          //     {(options || []).map((option, optionIndex) => (
          //       <option value={option.value} key={optionIndex}>
          //         {option.label}
          //       </option>
          //     ))}
          //   </Field>
          // ) : type == "multi-select" ? (
          //   (options || []).map((option, index) => (
          //     <div className="form-multi flex items-center">
          //       <Field
          //         type="checkbox"
          //         name={key}
          //         value={option.value}
          //         onChange={onChangeWrapped}
          //         style={{ minWidth: "3rem", width: "auto", marginRight: "10px" }}
          //       />{" "}
          //       {option.label}
          //     </div>
          //   ))
          // ) : type == "multi-choice" ? (
          //   (options || []).map((option) => (
          //     <div className="form-multi flex items-center">
          //       <Field
          //         type="radio"
          //         name={key}
          //         value={option.value}
          //         onChange={onChangeWrapped}
          //         style={{ marginRight: "10px" }}
          //       />
          //       <label>{option.label}</label>
          //     </div>
          //   ))
          // ) : type == "textarea" ? (
          //   <textarea
          //     name={key}
          //     onChange={onChangeWrapped}
          //     className="input w-full h-20"
          //     onBlur={handleBlur}
          //     value={value}
          //     placeholder={placeholder}
          //   />
          // ) : (
          //   <DebounceInput
          //     debounceTimeout={10}
          //     type={type}
          //     className="input"
          //     value={value}
          //     name={key}
          //     onChange={(e) => {
          //       e.target.value += "";
          //       onChangeWrapped(e);
          //     }}
          //     onBlur={handleBlur}
          //     ref={fieldRef}
          //     placeholder={placeholder}
          //     {...(block ? { maxLength, value: formattedValue } : {})}
          //   />
        }
      </div>
      {(touched[key] || attemptedSubmit) && errors[key] && (
        <div className="errors text-danger text-red-500">{errors[key]}</div>
      )}
    </>
  );
};
