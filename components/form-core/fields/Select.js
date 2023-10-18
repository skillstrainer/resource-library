"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Select = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _react = _interopRequireDefault(require("react"));
var _utils = require("../utils");
const _excluded = ["name", "options", "className"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const Select = _ref => {
  let {
      name,
      options = [],
      className
    } = _ref,
    fieldProps = _objectWithoutProperties(_ref, _excluded);
  const {
    formProps
  } = fieldProps;
  return /*#__PURE__*/_react.default.createElement("div", {
    key: name,
    className: "col-span-6 sm:col-span-3 ".concat(className)
  }, /*#__PURE__*/_react.default.createElement("select", _extends({
    style: {
      boxSizing: "border-box"
    }
  }, _lodash.default.omit(fieldProps, ["onChange"]), {
    name: name,
    className: "input-primary",
    onChange: function onChange(e) {
      const value = e.target.value === "" ? undefined : e.target.value;
      formProps.setFieldValue(name, value);
    }
  }), /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Choose an option"), options.map((option, i) => /*#__PURE__*/_react.default.createElement("option", {
    className: "p-2 font-medium",
    key: i,
    value: option.value
  }, option.label))));
};
exports.Select = Select;
var _default = (0, _utils.createPlugin)({
  Component: Select
});
exports.default = _default;