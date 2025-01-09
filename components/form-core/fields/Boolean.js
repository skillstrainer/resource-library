"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Boolean = void 0;
var _react = _interopRequireDefault(require("react"));
var _utils = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Boolean = _ref => {
  let {
    disabled,
    name,
    value,
    onChange: _onChange,
    trueLabel = "True",
    falseLabel = "False",
    className
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    key: name,
    className: "my-1 ".concat(className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    className: "h-7 w-7 text-orange focus:ring-0 focus:ring-offset-0 focus:border-0 rounded",
    onChange: e => _onChange(e.target.checked),
    checked: value,
    disabled: disabled
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "comments",
    className: "ml-3 text-sm font-medium text-japanese_indigo"
  }, value ? trueLabel : falseLabel)));
};
exports.Boolean = Boolean;
var _default = exports.default = (0, _utils.createPlugin)({
  Component: Boolean
});