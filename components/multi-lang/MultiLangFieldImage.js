"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MultiLangFieldImage;
exports.resolveFileFields = resolveFileFields;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _func = require("./utils/func");
var _useField = _interopRequireDefault(require("./utils/useField"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function MultiLangFieldImage(props) {
  const {
    style,
    className
  } = props;
  const {
    editable,
    value,
    defaultValue,
    updateField
  } = (0, _useField.default)(_objectSpread(_objectSpread({}, props), {}, {
    defaultValue: props.src
  }));
  const inputRef = (0, _react.useRef)();
  const [inputState, setInputState] = (0, _react.useState)({
    focussed: false
  });
  const setValue = e => {
    const value = e.currentTarget.files[0]; // Currently handling single images
    updateField(value);
  };
  const [src, setSrc] = (0, _react.useState)(typeof window === "undefined" && (value || defaultValue));
  (0, _react.useEffect)(() => {
    ;
    (async function () {
      const src = value || defaultValue;
      if (src instanceof File) setSrc(await (0, _func.fileToBase64)(src));else setSrc(src);
    })();
  }, [value]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: editable ? "multi-lang-field-image-container" : ""
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    ref: inputRef,
    onChange: setValue,
    style: {
      height: "0",
      width: "0",
      position: "absolute"
    },
    onFocus: () => setInputState(_objectSpread(_objectSpread({}, inputState), {}, {
      focussed: true
    })),
    onBlur: () => setInputState(_objectSpread(_objectSpread({}, inputState), {}, {
      focussed: false
    }))
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: src,
    style: _objectSpread(_objectSpread({}, style), {}, {
      outline: inputState.focussed ? "2px solid rgba(0,0,0,0.3)" : "0",
      cursor: "pointer"
    }),
    className: className,
    onClick: () => editable && inputRef.current.click()
  }));
}
async function resolveFileFields(data, uploadFunc) {
  if (Array.isArray(data)) {
    return await Promise.all(data.map(e => resolveFileFields(e, uploadFunc)));
  } else if (data && typeof data === "object") {
    if (data instanceof File) {
      return await uploadFunc(data);
    } else {
      for (const key in data) {
        data[key] = await resolveFileFields(data[key], uploadFunc);
      }
      return data;
    }
  } else return data;
}