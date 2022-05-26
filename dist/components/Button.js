"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Button;

require("core-js/modules/es.object.assign.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Button(props) {
  return /*#__PURE__*/_react.default.createElement("button", _extends({
    className: "px-6 py-3 bg-orange-500 text-white rounded-lg ".concat(props.className)
  }, _lodash.default.omit(props, ["className"])));
}