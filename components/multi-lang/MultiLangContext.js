"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiLangContext = void 0;
exports.default = MultiLangContextProvider;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _lodash = _interopRequireDefault(require("lodash"));
var _MultiLangFieldImage = require("./MultiLangFieldImage");
var _func = require("./utils/func");
var _Context = require("../../Context");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const MultiLangContext = exports.MultiLangContext = /*#__PURE__*/(0, _react.createContext)();
function MultiLangContextProvider(props) {
  const {
    multiLang: {
      publishMarketingWebsite
    }
  } = (0, _react.useContext)(_Context.STRLContext);
  const {
    initialData,
    isInEditableMode,
    loadContentFn,
    submitContentFn,
    enabled,
    uploadFn
  } = props;
  const submitSignal = (0, _react.useRef)(new _rxjs.Subject());

  /*
  *
  *
  Handling data
  *
  *
  */
  const [data, _setData] = (0, _react.useState)(initialData);
  const [changesSaved, setChangesSaved] = (0, _react.useState)(true);
  const setData = (key, value, actionObj) => {
    const actionType = actionObj && actionObj.action && actionObj.action.type;
    data[key] = value;
    _setData(_objectSpread({}, data));
    if (actionType !== "content.load") setChangesSaved(false);
  };

  /*
  *
  *
  Handling submissions requests from multiple forms (multi lang bodies)
  *
  *
  */
  const reqQueue = (0, _react.useRef)({});
  const queueErrors = (0, _react.useRef)({});
  const [submittingContent, setSubmittingContent] = (0, _react.useState)(null);
  const pushReq = key => {
    if (_lodash.default.isEmpty(reqQueue.current)) {
      // Queue is starting
      setSubmittingContent(true);
    }
    reqQueue.current[key] = true;
  };
  const popReq = key => {
    delete reqQueue.current[key];
    if (_lodash.default.isEmpty(reqQueue.current)) {
      // Queue is completed
      setSubmittingContent(false);

      // Handle queue errors
      if (Object.values(queueErrors.current).length > 0) alert("An error occurred while submitting some data. Please try again");else setChangesSaved(true);
    }
  };

  // When queue is complete, submittingContent is changed to false
  (0, _react.useEffect)(() => {
    if (submittingContent === false) alert("Content submitted successfully!");
  }, [submittingContent]);

  /*
  *
  *
  Submission and fetching methods for multi lang bodies to consume
  *
  *
  */
  const loadContent = _ref => {
    let {
      key
    } = _ref;
    return new Promise((res, rej) => loadContentFn({
      key
    }, res, rej));
  };
  const submitContent = _ref2 => {
    let {
      key,
      content,
      id
    } = _ref2;
    queueErrors.current = {};
    pushReq(key);
    return new Promise(async (res, rej) => {
      content = await (0, _MultiLangFieldImage.resolveFileFields)(content, uploadFn || _func.defaultUploadFn);
      return await submitContentFn({
        key,
        content,
        id
      }, res, rej);
    }).catch(err => {
      console.log(err);
      queueErrors.current[key] = err;
    }).then(res => {
      popReq(key);
      return res;
    });
  };

  // Submission trigger
  const submit = () => submitSignal.current.next(true);

  /*
  *
  *
  Debugging utilities
  *
  *
  */
  if (typeof window !== "undefined") window.MLState = () => console.log({
    changesSaved
  });

  /*
  *
  *
  View
  *
  *
  */
  return /*#__PURE__*/_react.default.createElement(MultiLangContext.Provider, {
    value: {
      loadContent,
      submitContent,
      submitSignal: submitSignal.current,
      submit,
      editable: enabled,
      isInEditableMode,
      data,
      setData,
      changesSaved,
      publishChanges: publishMarketingWebsite
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "toast loading ".concat(submittingContent ? "show" : "hide")
  }, "Submitting data..."), props.children);
}