import React, { useEffect, useRef, useState, useMemo } from "react";
import _ from "lodash";
import { Formik, Form } from "formik";

import {
  checkPlugins,
  deepMapObj,
  formatBySchema,
  getSchema,
  mergePlugins,
} from "./utils";
import FormSection from "./Section";
import {
  defaultPlugins,
  defaultPostprocessors,
  defaultPreprocessors,
} from "./config";

// Form processors
let globalPreprocessors = [...defaultPreprocessors];
export const getFormGlobalPreprocessors = () => globalPreprocessors;
export const setFormGlobalPostprocessors = (pp) =>
  (globalPostprocessors = [...defaultPostprocessors, ...pp]);

let globalPostprocessors = [...defaultPostprocessors];
export const getFormGlobalPostprocessors = () => globalPostprocessors;
export const setFormGlobalPreprocessors = (pp) =>
  (globalPreprocessors = [...defaultPreprocessors, ...pp]);

// Form plugins
let globalPlugins = { ...defaultPlugins };
export const getFormGlobalPlugins = () => globalPlugins;
export const setFormGlobalPlugins = (plugins) => {
  checkPlugins(plugins);
  globalPlugins = mergePlugins(defaultPlugins, plugins);
};

// Main component
const FormComponent = (props, ref) => {
  const {
    name,
    formBuilder,
    initValues,
    onSubmit,
    onSubmitError,
    submitButton,
    onUpdate,
    onCancel,
    hideForm,
    hideSubmit,
    className,
    preProcessors = globalPreprocessors,
    // postProcessors = globalPostprocessors,
  } = props;

  const plugins = useMemo(() => props.plugins || {}, [props.plugins]);

  const formName = name || "unnamed";
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState();
  const items = formBuilder(formValues);
  const allPlugins = useMemo(() => {
    const result = mergePlugins(globalPlugins, plugins);
    return result;
  }, [plugins, globalPlugins]);

  const setFieldValueFn = useRef();
  const [attemptedSubmit, setAttemptedSubmit] = useState();

  // Formik function references
  const formikSubmitFn = useRef();
  const formikSetValuesFn = useRef();
  const formikResetFn = useRef();

  // resolve validation schema
  const [validationSchema, setValidationSchema] = useState(null);
  useEffect(() => {
    if (items && !hideForm)
      setValidationSchema(getSchema({ type: "object", fields: items }));
  }, [items]);

  // Resolvers
  const resolvePlugins = () => {
    const activePlugins = {};
    deepMapObj(items, (item, meta) => {
      if (meta.type === "obj") {
        const p = allPlugins[item.type];
        if (p) {
          activePlugins[item.type] = p;
        }
      }
    });
    return activePlugins;
  };
  const resolvePreprocessors = () => {
    const plugins = resolvePlugins();
    const pluginPreprocessors = Object.values(plugins)
      .map((plugin) => {
        return (
          typeof plugin.preprocessor === "function" &&
          ((...args) => plugin.preprocessor(...args, plugin))
        );
      })
      .filter((e) => e);
    return [...pluginPreprocessors, ...preProcessors];
  };

  // Submission trigger
  const triggerSubmit = async () => {
    setAttemptedSubmit(true);
    return await formikSubmitFn.current();
  };
  // Submission logic
  const formikOnSubmit = async (values) => {
    setAttemptedSubmit(true);

    // Allowing only the key value pairs that are defined in form builder
    // let values;
    if (!hideForm)
      values = formatBySchema(values, {
        type: "object",
        fields: items,
      });
    else values = {};

    // Running values through form processors

    // pre processors
    const preProcessors = resolvePreprocessors();
    for (const preProcessor of preProcessors) {
      if (typeof preProcessor === "function") {
        values = await preProcessor(values);
      }
    }

    // submitting values
    onSubmit({ ...values }, setFieldValueFn.current);
    setFormValues(values);
    formikSetValuesFn.current(values);
  };

  // load initial values
  const initValuesLoaded = useRef();
  const [initValuesError, setInitValuesError] = useState();
  useEffect(() => {
    if (typeof initValues === "function")
      initValues()
        .then(async (val) => {
          initValuesLoaded.current = true;
          setFormValues(val || {});
        })
        .catch((err) => {
          setInitValuesError(err);
        });
    else {
      setFormValues(initValues || {});
      initValuesLoaded.current = true;
    }
  }, []);

  /*
    Handle form validation on validationSchema change:
    Added this feature because when the user had invalid default values,
    clicking on proceed only showed there was a problem in submitting the form
    but not exactly where the bad input was
  */
  const [validateFormFn, setValidateFormFn] = useState();
  useEffect(() => {
    if (validationSchema && validateFormFn) validateFormFn.run();
  }, [validationSchema, !!validateFormFn]);

  // Defining ref
  (function () {
    if (ref) {
      const refData = {
        submit: triggerSubmit,
        reset: formikResetFn.current,
      };

      if (typeof ref === "function") ref(refData);
      else if (typeof ref === "object") Object.assign(ref.current, refData);
    }
  })();

  return (
    <div className="w-full">
      {initValuesLoaded.current ? (
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={(values) =>
            formikOnSubmit(values)
              .then((res) => "Form submitted")
              .catch(
                (err) =>
                  (onSubmitError && onSubmitError(err)) ||
                  console.log("Couldn't submit form", err?.message || err)
              )
          }
        >
          {(formProps) => {
            const {
              values,
              errors,
              submitForm,
              setFieldValue,
              validateForm,
              setValues,
              resetForm,
            } = formProps;
            if (!validateFormFn) setValidateFormFn({ run: validateForm });
            if (
              JSON.stringify(values) !== JSON.stringify(formValues) ||
              JSON.stringify(errors) !== JSON.stringify(formErrors)
            ) {
              setFieldValueFn.current = setFieldValue;
              setFormValues({ ...values });
              setFormErrors({ ...errors });

              if (onUpdate)
                onUpdate({
                  values,
                  errors,
                });
            }

            formikSubmitFn.current = submitForm;
            formikSetValuesFn.current = setValues;
            formikResetFn.current = resetForm;

            return (
              <Form className={`justify-start ${className}`}>
                {items && !hideForm && (
                  <FormSection
                    fields={items}
                    formProps={{
                      ...formProps,
                      errors: { ...formErrors, ...errors },
                      formName,
                      plugins: allPlugins,
                      attemptedSubmit,
                    }}
                  />
                )}

                <div className="flex justify-between w-full mt-10">
                  {onCancel && (
                    <input
                      type="button"
                      onClick={() => onCancel()}
                      className="button-secondary"
                      value="Cancel"
                    />
                  )}

                  {!hideSubmit && (
                    <input
                      type="button"
                      onClick={triggerSubmit}
                      className={`button-primary ${
                        submitButton?.className || ""
                      }`}
                      value={submitButton?.text || "Proceed"}
                    />
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : initValuesError ? (
        <div>An error occured</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default React.forwardRef(FormComponent);
