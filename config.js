"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webappHost = exports.setConfig = exports.getConfig = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const initialConfig = {
  routing: {
    navigateFunction: () => {},
    LinkComponent: () => null
  }
};
let config = initialConfig;

const getConfig = () => config;

exports.getConfig = getConfig;

const setConfig = function setConfig() {
  let newConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  config = _objectSpread(_objectSpread({}, initialConfig), newConfig);
};

exports.setConfig = setConfig;
let webappHost = "https://webapp.skillstrainer.in";
exports.webappHost = webappHost;