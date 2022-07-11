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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = props => {
  const {
    formProps,
    name: key,
    field
  } = props;
  const {
    values,
    errors,
    touched,
    setFieldValue,
    plugins,
    attemptedSubmit
  } = formProps;
  let value = _lodash.default.get(values, key) || "";
  const {
    type
  } = field;
  const plugin = type !== "object" && (plugins[type] || plugins.input);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
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
  }) : null), (touched[key] || attemptedSubmit) && errors[key] && /*#__PURE__*/_react.default.createElement("div", {
    className: "errors text-danger text-red-500"
  }, errors[key]));
};

exports.default = _default;