"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _gr = require("react-icons/gr");
var _Context = require("../../../Context");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SidebarItem = _ref => {
  let {
    name = "Item",
    Icon = _gr.GrStatusPlaceholder,
    selected = false,
    className,
    onClick = () => {},
    linkTo = "#"
  } = _ref;
  const strlContext = (0, _react.useContext)(_Context.STRLContext);
  const {
    dependency: {
      dependencies
    }
  } = strlContext;
  const {
    Link
  } = dependencies || {};
  if (Link && typeof Link !== "object") throw {
    msg: "Missing required dependency: Link"
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "flex p-0 "
  }, /*#__PURE__*/_react.default.createElement(Link, {
    to: linkTo,
    onClick: onClick,
    className: "flex items-center w-full  rounded-md space-x-4 h-14 ".concat(selected ? "bg-orange-light" : "hover:bg-yellow-50", " ").concat(className)
  }, /*#__PURE__*/_react.default.createElement(Icon, {
    className: "flex text-lg ml-4 items-left ".concat(selected && "")
  }), /*#__PURE__*/_react.default.createElement("p", {
    className: "flex text-gray-700 font-medium text-sm font-poppins ".concat(selected && "")
  }, name)), /*#__PURE__*/_react.default.createElement("div", {
    className: " w-1 h-14 rounded-md ".concat(selected && "bg-orange")
  }));
};
var _default = exports.default = SidebarItem;