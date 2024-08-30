"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccordionItem = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AccordionItem = props => {
  const {
    isActive,
    toggle,
    title,
    children
  } = props;
  const {
    isNotToggleItem,
    onClick
  } = props;
  (0, _react.useEffect)(() => {}, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col w-full",
    style: {
      borderBottom: "1px solid var(--orange)"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "p-2 flex justify-between cursor-pointer items-center",
    onClick: isNotToggleItem ? onClick : toggle
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "small-title"
  }, title), isNotToggleItem ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("box-icon", {
    name: "right-arrow-alt",
    size: "sm"
  })) : /*#__PURE__*/_react.default.createElement("div", {
    style: {
      transform: "rotate(".concat(isActive ? "180" : "0", "deg)"),
      transition: "0.2s"
    }
  }, /*#__PURE__*/_react.default.createElement("box-icon", {
    name: "chevron-down",
    size: "sm"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full",
    style: {
      overflow: "hidden",
      height: isActive ? "auto" : "0"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full"
  }, children)));
};
exports.AccordionItem = AccordionItem;