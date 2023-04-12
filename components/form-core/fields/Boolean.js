"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Boolean = void 0;
var _react = _interopRequireDefault(require("react"));
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Boolean = _ref => {
  let {
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
    checked: value
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "comments",
    className: "ml-3 text-sm font-medium text-japanese_indigo"
  }, value ? trueLabel : falseLabel)));
};
exports.Boolean = Boolean;
var _default = (0, _utils.createPlugin)({
  Component: Boolean
});
exports.default = _default;