"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SerialableListItem;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SerialableListItem(props) {
  const {
    children,
    className,
    index,
    moveFn
  } = props;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "30px",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => moveFn(index, -1)
  }, "Up"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => moveFn(index, 1)
  }, "Down")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, children)));
}