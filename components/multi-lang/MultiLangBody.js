"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiLangBodyContext = void 0;
exports.default = MultiLangBody;
var _react = _interopRequireWildcard(require("react"));
var _MultiLangContext = require("./MultiLangContext");
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const MultiLangBodyContext = exports.MultiLangBodyContext = /*#__PURE__*/(0, _react.createContext)();
function MultiLangBody(props) {
  const {
    _key: key
  } = props;
  const {
    loadContent,
    submitContent,
    submitSignal,
    isInEditableMode,
    editable,
    data: allData = {},
    setData: setAllData
  } = (0, _react.useContext)(_MultiLangContext.MultiLangContext);
  const subscriptionRef = (0, _react.useRef)();
  const data = props.data || allData[key] || {};
  const setData = (newData, action) => setAllData(key, newData, action);
  (0, _react.useEffect)(() => {
    if (isInEditableMode && key) loadContent({
      key
    }).then(res => setData(res || {}, {
      key,
      action: {
        type: "content.load"
      }
    }));
  }, [key]);

  // Subscribing to submission signal
  (0, _react.useEffect)(() => {
    // Re-subscribing with the updated function (with updated closure)
    if (isInEditableMode && key) {
      if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
      subscriptionRef.current = submitSignal.subscribe(() => submitContent(_objectSpread(_objectSpread({}, data), {}, {
        key
      })).then(
      // set the data with the updated data received
      res => res && !_lodash.default.isEmpty(res) && setData(res, {
        key,
        action: {
          type: "content.load"
        }
      })));
      return () => subscriptionRef.current.unsubscribe();
    }
  }, [key, data, submitContent]);

  // Update field data
  const updateField = (name, value, action) => {
    _lodash.default.set(data, "content." + name, value);
    setData(_objectSpread({}, data), {
      key,
      action
    });
  };
  return /*#__PURE__*/_react.default.createElement(MultiLangBodyContext.Provider, {
    value: {
      content: data.content,
      updateField,
      editable
    }
  }, props.children);
}