"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EditableText;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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