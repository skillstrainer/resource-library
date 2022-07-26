"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EditableText;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function EditableText(props) {
  const {
    value,
    onFinish,
    spanClass,
    inputClass,
    buttonClass
  } = props;
  const [tempValue, setTempValue] = (0, _react.useState)(value);
  const [editing, setEditing] = (0, _react.useState)();

  const finish = () => {
    setEditing(false);
    onFinish(tempValue);
  };

  return /*#__PURE__*/_react.default.createElement("div", null, !editing ? /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "text-gray-400 ".concat(spanClass || ""),
    style: {
      marginRight: "0.5rem"
    }
  }, value), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    onClick: () => setEditing(true)
  }, /*#__PURE__*/_react.default.createElement("box-icon", {
    name: "edit",
    color: "gray"
  }))) : /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    onChange: e => setTempValue(e.target.value),
    className: "input ".concat(inputClass),
    onKeyPress: e => e.key == "Enter" && finish(),
    value: tempValue
  }), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: finish,
    className: "button ".concat(buttonClass)
  }, "Done")));
}