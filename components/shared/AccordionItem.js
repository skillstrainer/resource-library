"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccordionItem = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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