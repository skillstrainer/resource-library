"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rStringField = exports.rPhoneField = exports.rNumField = exports.rFileField = exports.rEmailField = exports.rBoolField = exports.occupationField = exports.idField = exports.annualIncomeField = exports.addressField = void 0;
var yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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