"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DateField = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));
require("react-datepicker/dist/react-datepicker.css");
var _utils = require("../utils");
const _excluded = ["name", "value", "onChange", "className", "dateFormat", "timeFormat", "timeCaption", "columnName"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const DateField = _ref => {
  let {
      name,
      value,
      onChange: _onChange,
      className,
      dateFormat = "dd/MM/yyyy",
      timeFormat,
      timeCaption,
      columnName
    } = _ref,
    dateProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", {
    key: name,
    className: "".concat(className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "relative rounded-md shadow-sm"
  }, /*#__PURE__*/_react.default.createElement(_reactDatepicker.default, _extends({
    style: {
      boxSizing: "border-box"
    },
    className: "input-primary",
    dateFormat: dateFormat,
    name: name,
    selected: value ? new Date(value) : new Date(),
    onChange: date => _onChange(date.toISOString()),
    timeFormat: timeFormat,
    timeCaption: timeCaption
  }, dateProps))));
};
exports.DateField = DateField;
var _default = (0, _utils.createPlugin)({
  Component: DateField
});
exports.default = _default;