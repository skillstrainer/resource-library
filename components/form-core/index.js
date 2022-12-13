"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFormGlobalPreprocessors = exports.setFormGlobalPostprocessors = exports.setFormGlobalPlugins = exports.getFormGlobalPreprocessors = exports.getFormGlobalPostprocessors = exports.getFormGlobalPlugins = exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.json.stringify.js");

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _formik = require("formik");

var _utils = require("./utils");

var _Section = _interopRequireDefault(require("./Section"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Form processors
let globalPreprocessors = [..._config.defaultPreprocessors];

const getFormGlobalPreprocessors = () => globalPreprocessors;

exports.getFormGlobalPreprocessors = getFormGlobalPreprocessors;

const setFormGlobalPostprocessors = pp => globalPostprocessors = [..._config.defaultPostprocessors, ...pp];

exports.setFormGlobalPostprocessors = setFormGlobalPostprocessors;
let globalPostprocessors = [..._config.defaultPostprocessors];

const getFormGlobalPostprocessors = () => globalPostprocessors;

exports.getFormGlobalPostprocessors = getFormGlobalPostprocessors;

const setFormGlobalPreprocessors = pp => globalPreprocessors = [..._config.defaultPreprocessors, ...pp]; // Form plugins


exports.setFormGlobalPreprocessors = setFormGlobalPreprocessors;

let globalPlugins = _objectSpread({}, _config.defaultPlugins);

const getFormGlobalPlugins = () => globalPlugins;

exports.getFormGlobalPlugins = getFormGlobalPlugins;

const setFormGlobalPlugins = plugins => {
  (0, _utils.checkPlugins)(plugins);
  globalPlugins = (0, _utils.mergePlugins)(_config.defaultPlugins, plugins);
}; // Main component


exports.setFormGlobalPlugins = setFormGlobalPlugins;

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
    preProcessors = globalPreprocessors // postProcessors = globalPostprocessors,

  } = props;
  const plugins = (0, _react.useMemo)(() => props.plugins || {}, [props.plugins]);
  const formName = name || "unnamed";
  const [formValues, setFormValues] = (0, _react.useState)({});
  const [formErrors, setFormErrors] = (0, _react.useState)();
  const items = formBuilder(formValues);
  const allPlugins = (0, _react.useMemo)(() => {
    const result = (0, _utils.mergePlugins)(globalPlugins, plugins);
    return result;
  }, [plugins, globalPlugins]);
  const setFieldValueFn = (0, _react.useRef)();
  const [attemptedSubmit, setAttemptedSubmit] = (0, _react.useState)(); // Formik function references

  const formikSubmitFn = (0, _react.useRef)();
  const formikSetValuesFn = (0, _react.useRef)();
  const formikResetFn = (0, _react.useRef)(); // resolve validation schema

  const [validationSchema, setValidationSchema] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (items && !hideForm) setValidationSchema((0, _utils.getSchema)({
      type: "object",
      fields: items
    }));
  }, [items]); // Resolvers

  const resolvePlugins = () => {
    const activePlugins = {};
    (0, _utils.deepMapObj)(items, (item, meta) => {
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
    const pluginPreprocessors = Object.values(plugins).map(plugin => {
      return typeof plugin.preprocessor === "function" && function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return plugin.preprocessor(...args, plugin);
      };
    }).filter(e => e);
    return [...pluginPreprocessors, ...preProcessors];
  }; // Submission trigger


  const triggerSubmit = async () => {
    setAttemptedSubmit(true);
    return await formikSubmitFn.current();
  }; // Submission logic


  const formikOnSubmit = async values => {
    setAttemptedSubmit(true); // Allowing only the key value pairs that are defined in form builder
    // let values;

    if (!hideForm) values = (0, _utils.formatBySchema)(values, {
      type: "object",
      fields: items
    });else values = {}; // Running values through form processors
    // pre processors

    const preProcessors = resolvePreprocessors();

    for (const preProcessor of preProcessors) {
      if (typeof preProcessor === "function") {
        values = await preProcessor(values);
      }
    } // submitting values


    onSubmit(_objectSpread({}, values), setFieldValueFn.current);
    setFormValues(values);
    formikSetValuesFn.current(values);
  }; // load initial values


  const initValuesLoaded = (0, _react.useRef)();
  const [initValuesError, setInitValuesError] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    if (typeof initValues === "function") initValues().then(async val => {
      initValuesLoaded.current = true;
      setFormValues(val || {});
    }).catch(err => {
      setInitValuesError(err);
    });else {
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

  const [validateFormFn, setValidateFormFn] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    if (validationSchema && validateFormFn) validateFormFn.run();
  }, [validationSchema, !!validateFormFn]); // Defining ref

  (function () {
    if (ref) {
      const refData = {
        submit: triggerSubmit,
        reset: formikResetFn.current
      };
      if (typeof ref === "function") ref(refData);else if (typeof ref === "object") Object.assign(ref.current, refData);
    }
  })();

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full"
  }, initValuesLoaded.current ? /*#__PURE__*/_react.default.createElement(_formik.Formik, {
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: values => formikOnSubmit(values).then(res => "Form submitted").catch(err => onSubmitError && onSubmitError(err) || console.log("Couldn't submit form", (err === null || err === void 0 ? void 0 : err.message) || err))
  }, formProps => {
    const {
      values,
      errors,
      submitForm,
      setFieldValue,
      validateForm,
      setValues,
      resetForm
    } = formProps;
    if (!validateFormFn) setValidateFormFn({
      run: validateForm
    });

    if (JSON.stringify(values) !== JSON.stringify(formValues) || JSON.stringify(errors) !== JSON.stringify(formErrors)) {
      setFieldValueFn.current = setFieldValue;
      setFormValues(_objectSpread({}, values));
      setFormErrors(_objectSpread({}, errors));
      if (onUpdate) onUpdate({
        values,
        errors
      });
    }

    formikSubmitFn.current = submitForm;
    formikSetValuesFn.current = setValues;
    formikResetFn.current = resetForm;
    return /*#__PURE__*/_react.default.createElement(_formik.Form, {
      className: "justify-start ".concat(className)
    }, items && !hideForm && /*#__PURE__*/_react.default.createElement(_Section.default, {
      fields: items,
      formProps: _objectSpread(_objectSpread({}, formProps), {}, {
        errors: _objectSpread(_objectSpread({}, formErrors), errors),
        formName,
        plugins: allPlugins,
        attemptedSubmit
      })
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "flex justify-between w-full mt-10"
    }, onCancel && /*#__PURE__*/_react.default.createElement("input", {
      type: "button",
      onClick: () => onCancel(),
      className: "button-secondary",
      value: "Cancel"
    }), !hideSubmit && /*#__PURE__*/_react.default.createElement("input", {
      type: "button",
      onClick: triggerSubmit,
      className: "button-primary ".concat((submitButton === null || submitButton === void 0 ? void 0 : submitButton.className) || ""),
      value: (submitButton === null || submitButton === void 0 ? void 0 : submitButton.text) || "Proceed"
    })));
  }) : initValuesError ? /*#__PURE__*/_react.default.createElement("div", null, "An error occured") : /*#__PURE__*/_react.default.createElement("div", null, "Loading..."));
};

var _default = /*#__PURE__*/_react.default.forwardRef(FormComponent);

exports.default = _default;