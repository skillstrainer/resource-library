"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiLangContext = void 0;
exports.default = MultiLangContextProvider;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _rxjs = require("rxjs");

var _lodash = _interopRequireDefault(require("lodash"));

var _MultiLangFieldImage = require("./MultiLangFieldImage");

var _func = require("./utils/func");

var _Context = _interopRequireDefault(require("../../Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MultiLangContext = /*#__PURE__*/(0, _react.createContext)();
exports.MultiLangContext = MultiLangContext;

function MultiLangContextProvider(props) {
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
      setSubmittingContent(false); // Handle queue errors

      if (Object.values(queueErrors.current).length > 0) alert("An error occurred while submitting some data. Please try again");else setChangesSaved(true);
    }
  }; // When queue is complete, submittingContent is changed to false


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
  }; // Submission trigger


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
      publishChanges: _Context.default.multiLang.publishMarketingWebsite
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "toast loading ".concat(submittingContent ? "show" : "hide")
  }, "Submitting data..."), props.children);
}