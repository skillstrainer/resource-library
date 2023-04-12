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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
var _default = MultiLangField;
exports.default = _default;