"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.object.assign.js");
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _useField = _interopRequireDefault(require("./utils/useField"));
var _events = require("./utils/events");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const MultiLangField = props => {
  const {
    editable,
    value,
    defaultValue,
    events: {
      text: inputTextEvents
    }
  } = (0, _useField.default)(props);
  return /*#__PURE__*/_react.default.createElement("span", _extends({}, inputTextEvents, {
    style: {
      outline: editable ? "1px solid #333" : "0"
    }
  }, editable ? {
    contentEditable: true,
    onPointerDown: _events.disableParents,
    onKeyDown: _events.disableParents
  } : {}), value || defaultValue || (editable ? "_" : ""));
};
var _default = exports.default = MultiLangField;