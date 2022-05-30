"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Modal;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Modal(props) {
  const {
    isOpen,
    onClose,
    children,
    noBody,
    innerContainer
  } = props;
  const transitionTime = 0.4;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "fixed",
      height: "100vh",
      width: "100vw",
      top: "0",
      left: "0",
      transition: transitionTime + "s",
      opacity: isOpen ? "1" : "0",
      pointerEvents: isOpen ? "all" : "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "arial",
      zIndex: "100"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: "100%",
      width: "100%",
      background: "rgba(0,0,0,0.5)"
    },
    onClick: onClose || (() => {})
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread(_objectSpread({
      position: "absolute",
      top: isOpen ? "50%" : "45%",
      left: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      transition: transitionTime + "s",
      maxHeight: "100%",
      overflow: "auto"
    }, !noBody ? {
      background: "#fff",
      padding: "10px",
      minWidth: "300px"
    } : {}), (innerContainer === null || innerContainer === void 0 ? void 0 : innerContainer.style) || {}),
    className: innerContainer === null || innerContainer === void 0 ? void 0 : innerContainer.className
  }, !noBody && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "mt-1 mr-1 h-9 w-9 cursor-pointer",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    onClick: onClose || (() => {}),
    style: {
      height: "1.5rem",
      width: "1.5rem"
    }
  }, /*#__PURE__*/_react.default.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  }))), /*#__PURE__*/_react.default.createElement("div", null, children)));
}