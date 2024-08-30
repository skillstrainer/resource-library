"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MultiLangFieldMd;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _reactMarkdown = _interopRequireDefault(require("react-markdown"));
var _useField = _interopRequireDefault(require("./utils/useField"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function MultiLangFieldMd(props) {
  const {
    editable,
    value,
    defaultValue,
    events: {
      text: inputTextEvents
    }
  } = (0, _useField.default)(props);
  const {
    editor
  } = props;
  const [editing, setEditing] = (0, _react.useState)();
  const textareaRef = (0, _react.useRef)();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("textarea", {
    onFocus: e => {
      setEditing(true);
      inputTextEvents.onFocus(e);
      e.currentTarget.value = value || defaultValue || "_";
    },
    onBlur: e => {
      setEditing();
      inputTextEvents.onBlur(e);
    },
    defaultValue: value || defaultValue || "_",
    style: editable && editing ? _objectSpread({
      width: "100%",
      height: "auto"
    }, (editor === null || editor === void 0 ? void 0 : editor.dims) || {}) : {
      height: "0",
      width: "0",
      padding: "0",
      border: "0"
    },
    ref: textareaRef
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: editable && editing ? {
      width: "0",
      height: "0",
      overflow: "hidden"
    } : editable ? {
      border: "1px solid #000"
    } : {
      height: "auto",
      width: "auto"
    },
    onClick: () => editable && textareaRef.current.focus(),
    className: "anti-tailwind"
  }, /*#__PURE__*/_react.default.createElement(_reactMarkdown.default, {
    children: value || defaultValue
  })));
}