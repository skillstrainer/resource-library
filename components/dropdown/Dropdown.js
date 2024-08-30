"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = Dropdown;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _Context = require("../../Context");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Dropdown(props) {
  const strlContext = (0, _react.useContext)(_Context.STRLContext);
  const {
    dependency: {
      dependencies
    }
  } = strlContext;
  const {
    Link
  } = dependencies || {};
  const [isActive, setIsActive] = (0, _react.useState)(false);
  const dropdownRef = (0, _react.useRef)(null);
  const onClick = () => {
    setIsActive(!isActive);
  };
  (0, _react.useEffect)(() => {
    const pageClickEvent = e => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    } else {
      window.removeEventListener("click", pageClickEvent);
    }
  }, [isActive]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "menu-container flex flex-col items-center w-32 h-6 p-2 rounded-md font-poppins hover:shadow-md "
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: onClick,
    className: ""
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "menu-trigger rounded-md p-2 w-32 "
  }, props.title)), /*#__PURE__*/_react.default.createElement("nav", {
    className: "menu mt-2 ".concat(isActive ? "block" : "hidden")
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: ""
  }, props.selections.map(item => {
    item.component = item.url ? Link : "button";
    return /*#__PURE__*/_react.default.createElement("li", {
      className: " w-32 p-2 text-center hover:bg-gray-100 hover:text-orange-600 "
    }, /*#__PURE__*/_react.default.createElement(item.component, {
      to: item.url,
      onClick: item.onClick1
    }, item.name));
  }))));
}