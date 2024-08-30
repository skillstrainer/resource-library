"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFormGlobalPreprocessors = exports.setFormGlobalPostprocessors = exports.setFormGlobalPlugins = exports.getFormGlobalPreprocessors = exports.getFormGlobalPostprocessors = exports.getFormGlobalPlugins = exports.default = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _formik = require("formik");
var _utils = require("./utils");
var _Section = _interopRequireDefault(require("./Section"));
var _config = require("./config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Form processors
let globalPreprocessors = [..._config.defaultPreprocessors];
const getFormGlobalPreprocessors = () => globalPreprocessors;
exports.getFormGlobalPreprocessors = getFormGlobalPreprocessors;
const setFormGlobalPostprocessors = pp => globalPostprocessors = [..._config.defaultPostprocessors, ...pp];
exports.setFormGlobalPostprocessors = setFormGlobalPostprocessors;
let globalPostprocessors = [..._config.defaultPostprocessors];
const getFormGlobalPostprocessors = () => globalPostprocessors;
exports.getFormGlobalPostprocessors = getFormGlobalPostprocessors;
const setFormGlobalPreprocessors = pp => globalPreprocessors = [..._config.defaultPreprocessors, ...pp];

// Form plugins
exports.setFormGlobalPreprocessors = setFormGlobalPreprocessors;
let globalPlugins = _objectSpread({}, _config.defaultPlugins);
const getFormGlobalPlugins = () => globalPlugins;
exports.getFormGlobalPlugins = getFormGlobalPlugins;
const setFormGlobalPlugins = plugins => {
  (0, _utils.checkPlugins)(plugins);
  globalPlugins = (0, _utils.mergePlugins)(_config.defaultPlugins, plugins);
};

// Main component
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
    preProcessors = globalPreprocessors,
    // postProcessors = globalPostprocessors,
    style = {}
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
  const [isSubmitting, setIsSubmitting] = (0, _react.useState)();
  const setFieldValueFn = (0, _react.useRef)();
  const [attemptedSubmit, setAttemptedSubmit] = (0, _react.useState)();

  // Formik function references
  const formikSubmitFn = (0, _react.useRef)();
  const formikSetValuesFn = (0, _react.useRef)();
  const formikResetFn = (0, _react.useRef)();

  // resolve validation schema
  const [validationSchema, setValidationSchema] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (items && !hideForm) {
      const newSchema = (0, _utils.getObjectSchema)({
        type: "object",
        fields: items
      }, formValues);
      setValidationSchema(newSchema);
    }
  }, [items]);

  // Resolvers
  const resolvePlugins = () => {
    const activePlugins = {};
    const allTypes = (0, _utils.getTypesFromItems)({
      type: "object",
      fields: items
    }, formValues);
    for (const type of allTypes) {
      const p = allPlugins[type];
      if (p) {
        activePlugins[type] = p;
      }
    }
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
  };

  // Submission trigger
  const triggerSubmit = async () => {
    setAttemptedSubmit(true);
    return await formikSubmitFn.current();
  };
  // Submission logic
  const formikOnSubmit = async values => {
    setAttemptedSubmit(true);

    // Allowing only the key value pairs that are defined in form builder
    // let values;
    if (!hideForm) values = (0, _utils.formatBySchema)(values, {
      type: "object",
      fields: items
    });else values = {};

    // Running values through form processors

    // pre processors
    const preProcessors = resolvePreprocessors();
    for (const preProcessor of preProcessors) {
      if (typeof preProcessor === "function") {
        values = await preProcessor(values);
      }
    }

    // submitting values
    setFormValues(values);
    formikSetValuesFn.current(values);
    return onSubmit(_objectSpread({}, values), setFieldValueFn.current);
  };

  // load initial values
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
  }, [validationSchema, !!validateFormFn]);

  // Defining ref
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
    onSubmit: values => {
      setIsSubmitting(true);
      return formikOnSubmit(values).then(res => "Form submitted").catch(err => onSubmitError && onSubmitError(err) || console.log("Couldn't submit form", (err === null || err === void 0 ? void 0 : err.message) || err)).finally(() => setIsSubmitting(false));
    }
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
      className: "justify-start"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "justify-start ".concat(className),
      style: style
    }, items && !hideForm && /*#__PURE__*/_react.default.createElement(_Section.default, {
      key: name,
      fields: items,
      formProps: _objectSpread(_objectSpread({}, formProps), {}, {
        errors: _objectSpread(_objectSpread({}, formErrors), errors),
        formName,
        plugins: allPlugins,
        attemptedSubmit
      })
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "flex justify-between w-full mt-3"
    }, onCancel && /*#__PURE__*/_react.default.createElement("input", {
      type: "button",
      onClick: () => onCancel(),
      className: "button-secondary",
      value: "Cancel"
    }), !hideSubmit && /*#__PURE__*/_react.default.createElement("input", {
      type: "button",
      onClick: triggerSubmit,
      className: "button-primary ".concat((submitButton === null || submitButton === void 0 ? void 0 : submitButton.className) || ""),
      value: isSubmitting ? "Please wait..." : (submitButton === null || submitButton === void 0 ? void 0 : submitButton.text) || "Proceed",
      disabled: isSubmitting || (submitButton === null || submitButton === void 0 ? void 0 : submitButton.disabled)
    })));
  }) : initValuesError ? /*#__PURE__*/_react.default.createElement("div", null, "An error occured") : /*#__PURE__*/_react.default.createElement("div", null, "Loading..."));
};
var _default = exports.default = /*#__PURE__*/_react.default.forwardRef(FormComponent);