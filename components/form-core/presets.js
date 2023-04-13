"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rStringField = exports.rPhoneField = exports.rNumField = exports.rFileField = exports.rEmailField = exports.rBoolField = exports.occupationField = exports.idField = exports.annualIncomeField = exports.addressField = void 0;
require("core-js/modules/es.symbol.description.js");
var yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const rStringField = (label, opts) => {
  let schema = yup.string();
  if (opts !== null && opts !== void 0 && opts.required) schema = schema.required(label + " is required");else schema = schema.nullable();
  return _objectSpread({
    label,
    schema
  }, opts);
};
exports.rStringField = rStringField;
const rNumField = (label, opts) => ({
  label,
  schema: yup.number("Please enter a valid number").nullable(),
  // .required(`${label} is required`),
  type: "number"
});
exports.rNumField = rNumField;
const rPhoneField = (label, opts) => ({
  label,
  schema: yup.string().matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please enter a valid input").nullable(),
  // .required(`${label} cannot be empty`),
  type: "tel"
});
exports.rPhoneField = rPhoneField;
const rEmailField = (label, opts) => _objectSpread({
  label,
  schema: yup.string().email("Please enter a valid input").nullable(),
  // .required(`${label} is required`),
  type: "email"
}, opts);
exports.rEmailField = rEmailField;
const rFileField = (label, buttonText, opts) => {
  let schema = yup.array().of(yup.object().shape({
    url: yup.string(),
    name: yup.string(),
    id: yup.string().nullable()
  }));
  if (opts !== null && opts !== void 0 && opts.required) {
    schema = schema.min(1).required("".concat(label, " is required"));
  }
  return _objectSpread({
    label,
    buttonText,
    type: "file",
    showCaptureButton: true,
    schema
  }, opts);
};
exports.rFileField = rFileField;
const rBoolField = (label, _ref, opts) => {
  let {
    yes = "Yes",
    no = "No"
  } = _ref;
  return _objectSpread({
    label,
    schema: opts !== null && opts !== void 0 && opts.required ? yup.bool().required("".concat(label, " is required")) : yup.bool().nullable(),
    type: "select",
    options: [{
      label: yes,
      value: true
    }, {
      label: no,
      value: false
    }]
  }, opts);
};
exports.rBoolField = rBoolField;
const idField = () => ({
  type: "hidden",
  schema: yup.string().nullable()
});
exports.idField = idField;
const occupationField = (label, opts) => _objectSpread({
  type: "select",
  schema: yup.string().nullable(),
  label,
  options: [{
    value: "Unemployed",
    label: "Unemployed"
  }, {
    value: "Farmer",
    label: "Farmer"
  }, {
    value: "Govt. Job",
    label: "Govt. Job"
  }, {
    value: "Private Job",
    label: "Private Job"
  }, {
    value: "Self employed",
    label: "Self employed"
  }, {
    value: "Working Professionals",
    label: "Working Professionals"
  }, {
    value: "Retired",
    label: "Retired"
  }, {
    value: "Homemaker",
    label: "Homemaker"
  }]
}, opts);
exports.occupationField = occupationField;
const annualIncomeField = (label, opts) => _objectSpread({
  type: "select",
  schema: yup.string().nullable(),
  label,
  options: [{
    label: "Less than 1L",
    value: "Less than 1L"
  }, {
    label: "1L - 2.5L",
    value: "1L - 2.5L"
  }, {
    label: "2.5L - 5L",
    value: "2.5L - 5L"
  }, {
    label: "5L and above",
    value: "5L and above"
  }]
}, opts);
exports.annualIncomeField = annualIncomeField;
const addressField = (label, opts) => _objectSpread({
  label,
  type: "address",
  schema: yup.object()
}, opts);
exports.addressField = addressField;