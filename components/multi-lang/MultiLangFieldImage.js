"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MultiLangFieldImage;
exports.resolveFileFields = resolveFileFields;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _func = require("./utils/func");

var _useField = _interopRequireDefault(require("./utils/useField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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