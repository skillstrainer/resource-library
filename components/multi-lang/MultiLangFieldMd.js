"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MultiLangFieldMd;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactMarkdown = _interopRequireDefault(require("react-markdown"));

var _useField = _interopRequireDefault(require("./utils/useField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      width: "0"
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