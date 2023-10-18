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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var _default = SidebarItem;
exports.default = _default;