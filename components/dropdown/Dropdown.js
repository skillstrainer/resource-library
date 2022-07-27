"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = Dropdown;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _Context = require("../../Context");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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