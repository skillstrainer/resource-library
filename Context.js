"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STRLContext = void 0;
exports.STRLContextProvider = STRLContextProvider;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _MultiLangContext = _interopRequireDefault(require("./components/multi-lang/MultiLangContext"));

var _course = _interopRequireDefault(require("./services/course"));

var _mutliLang = _interopRequireDefault(require("./services/mutli-lang"));

var _request = _interopRequireDefault(require("./services/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const STRLContext = /*#__PURE__*/(0, _react.createContext)();
exports.STRLContext = STRLContext;
const config = {};

function STRLContextProvider(props) {
  // Request services
  const [requestServices] = (0, _request.default)(config);
  config.request = requestServices; // Course services

  const [courseServices, courseElements] = (0, _course.default)(config);
  config.course = courseServices; // Multi lang services

  const [multiLangServices, multiLangElements] = (0, _mutliLang.default)(config);
  config.multiLang = multiLangServices;
  const elements = [...courseElements, ...multiLangElements];
  return /*#__PURE__*/_react.default.createElement(STRLContext.Provider, {
    value: _objectSpread({}, config)
  }, /*#__PURE__*/_react.default.createElement(_MultiLangContext.default, props.multiLang || {}, props.children, elements));
}