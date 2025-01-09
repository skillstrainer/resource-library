"use strict";

require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.string.includes.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DateTime = void 0;
var _react = _interopRequireDefault(require("react"));
var _utils = require("../utils");
var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));
require("react-datepicker/dist/react-datepicker.css");
const _excluded = ["disabled", "name", "onChange", "placeholder", "className", "value"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
const DateTime = _ref => {
  let {
      disabled,
      name,
      onChange: _onChange,
      placeholder,
      className,
      value
    } = _ref,
    fieldProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", {
    key: name,
    className: "".concat(className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "relative rounded-md shadow-sm"
  }, /*#__PURE__*/_react.default.createElement(_reactDatepicker.default, _extends({
    disabled: disabled,
    className: "input-primary",
    showTimeSelect: true,
    dateFormat: "MMMM d, yyyy h:mm a",
    timeFormat: "HH:mm",
    timeCaption: "Time",
    placeholderText: placeholder
  }, fieldProps, {
    selected: value ? new Date(value) : new Date(),
    name: name,
    onChange: date => _onChange(date.toISOString())
  }))));
};
exports.DateTime = DateTime;
var _default = exports.default = (0, _utils.createPlugin)({
  Component: DateTime
});