"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STRLContext = void 0;
exports.STRLContextProvider = STRLContextProvider;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _MultiLangContext = _interopRequireDefault(require("./components/multi-lang/MultiLangContext"));
var _course = _interopRequireDefault(require("./services/course"));
var _dependency = _interopRequireDefault(require("./services/dependency"));
var _mutliLang = _interopRequireDefault(require("./services/mutli-lang"));
var _request = _interopRequireDefault(require("./services/request"));
var _toast = _interopRequireDefault(require("./services/toast"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const STRLContext = exports.STRLContext = /*#__PURE__*/(0, _react.createContext)();
let config;
function STRLContextProvider(props) {
  if (!config) config = {
    multiLang: props.multiLang,
    course: props.course,
    request: props.request,
    dependencies: props.dependencies
  };

  // Dependency services
  const [dependencyServices] = (0, _dependency.default)(config);
  config.dependency = dependencyServices;

  // Request services
  const [requestServices] = (0, _request.default)(config);
  config.request = requestServices;

  // Course services
  const [courseServices, courseElements] = (0, _course.default)(config);
  config.course = courseServices;

  // Multi lang services
  const [multiLangServices, multiLangElements] = (0, _mutliLang.default)(config);
  config.multiLang = multiLangServices;

  // Toast services
  const [toastServices, toastElements] = (0, _toast.default)(config);
  config.toast = toastServices;
  const elements = [...courseElements, ...multiLangElements, ...toastElements];
  return /*#__PURE__*/_react.default.createElement(STRLContext.Provider, {
    value: _objectSpread({}, config)
  }, /*#__PURE__*/_react.default.createElement(_MultiLangContext.default, props.multiLang || {}, props.children, elements));
}