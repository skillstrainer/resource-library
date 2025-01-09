"use strict";

require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.string.includes.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MultiSelect = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _reactSelect = _interopRequireDefault(require("react-select"));
var _utils = require("../utils");
const _excluded = ["disabled", "options", "value", "onChange", "className"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
const MultiSelect = _ref => {
  let {
      disabled,
      options = [],
      value,
      onChange,
      className
    } = _ref,
    selectProps = _objectWithoutProperties(_ref, _excluded);
  // set value for default selection

  // handle onChange event of the dropdown
  const handleChange = e => {
    e = e.map(option => option.value);
    if (e.length) {
      if (e[e.length - 1] === "#") e = null;else if (e[e.length - 1] === "*") e = options.map(e => e.value);
    } else e = null;
    onChange(e);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-1 col-span-6 sm:col-span-3 ".concat(className)
  }, /*#__PURE__*/_react.default.createElement(_reactSelect.default, _extends({
    isDisabled: disabled,
    style: {
      boxSizing: "border-box"
    }
  }, selectProps, {
    isMulti: true,
    options: options.length === (value || []).length ? [{
      value: "#",
      label: "Deselect All"
    }, ...options] : [{
      value: "*",
      label: "Select All"
    }, ...options],
    value: options.filter(obj => Array.isArray(value) && value.indexOf(obj.value) > -1),
    onChange: handleChange,
    className: "basic-multi-select",
    classNamePrefix: "select"
  })));
};
exports.MultiSelect = MultiSelect;
var _default = exports.default = (0, _utils.createPlugin)({
  Component: MultiSelect
});