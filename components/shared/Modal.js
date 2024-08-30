"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Modal;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    },
    className: "w-screen h-screen"
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
      overflow: "auto",
      borderRadius: "10px"
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