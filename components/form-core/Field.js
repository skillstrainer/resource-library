"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _Section = _interopRequireDefault(require("./Section"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FormField = props => {
  const {
    formProps,
    name: key,
    field
  } = props;
  const {
    values,
    setFieldValue,
    plugins,
    attemptedSubmit
  } = formProps;
  let value = _lodash.default.get(values, key) || "";
  const {
    type,
    label
  } = field;
  const plugin = type !== "object" && (plugins[type] || plugins.input);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full"
  }, plugin && plugin.Component ? /*#__PURE__*/_react.default.createElement(plugin.Component, _extends({
    name: key,
    value: value,
    onChange: val => {
      setFieldValue(key, val);
    }
  }, field, {
    pluginContext: plugin,
    formProps: formProps
  })) : type === "object" ? /*#__PURE__*/_react.default.createElement(_Section.default, {
    fields: field.fields,
    formProps: formProps,
    prefix: key,
    className: "input w-full"
  }) : null);
};
var _default = exports.default = FormField;