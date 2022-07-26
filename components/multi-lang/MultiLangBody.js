"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiLangBodyContext = void 0;
exports.default = MultiLangBody;

var _react = _interopRequireWildcard(require("react"));

var _MultiLangContext = require("./MultiLangContext");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MultiLangBodyContext = /*#__PURE__*/(0, _react.createContext)();
exports.MultiLangBodyContext = MultiLangBodyContext;

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
  }, [key]); // Subscribing to submission signal

  (0, _react.useEffect)(() => {
    // Re-subscribing with the updated function (with updated closure)
    if (isInEditableMode && key) {
      if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
      subscriptionRef.current = submitSignal.subscribe(() => submitContent(_objectSpread(_objectSpread({}, data), {}, {
        key
      })).then( // set the data with the updated data received
      res => res && !_lodash.default.isEmpty(res) && setData(res, {
        key,
        action: {
          type: "content.load"
        }
      })));
      return () => subscriptionRef.current.unsubscribe();
    }
  }, [key, data, submitContent]); // Update field data

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