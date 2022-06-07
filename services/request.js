"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRequestService;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.reduce.js");

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useRequestService(config) {
  const reqConf = (config === null || config === void 0 ? void 0 : config.request) || {};
  const [env, setEnvironment] = (0, _react.useState)(reqConf.env || "");
  const [jwtToken, setJwtToken] = (0, _react.useState)(reqConf.jwtToken);
  const [accessToken, setAccessToken] = (0, _react.useState)(reqConf.accessToken);
  (0, _react.useEffect)(() => {
    setJwtToken(reqConf.jwtToken);
    setAccessToken(reqConf.accessToken);
  }, [reqConf.jwtToken, reqConf.accessToken]);
  const defaultHeaders = {
    "access-token": accessToken,
    "jwt-token": jwtToken,
    Authorization: "Bearer ".concat(jwtToken || "")
  };
  const vars = _config.consts[env] || _config.consts["dev"];
  const {
    apiUrl,
    adminApiUrl
  } = vars;

  const services = _objectSpread(_objectSpread({
    // Config updater
    setEnvironment,
    setJwtToken,
    setAccessToken,
    // consts
    env,
    jwtToken,
    accessToken
  }, vars), [{
    key: "api",
    baseURL: apiUrl
  }, {
    key: "adminApi",
    baseURL: adminApiUrl
  }].reduce((acc, _ref) => {
    let {
      key,
      baseURL
    } = _ref;
    console.log(key, baseURL);
    const networkRequests = {
      makeGetRequest: (endPoint, headers) => {
        return _axios.default.get(baseURL + endPoint, {
          headers: _objectSpread(_objectSpread({}, defaultHeaders), headers)
        }).then(_ref2 => {
          let {
            data
          } = _ref2;
          return data;
        });
      },
      makePostRequest: (endPoint, data, headers) => {
        return _axios.default.post(baseURL + endPoint, data, {
          headers: _objectSpread(_objectSpread({}, defaultHeaders), headers)
        }).then(_ref3 => {
          let {
            data
          } = _ref3;
          return data;
        });
      },
      makePutRequest: (endPoint, data, headers) => {
        return _axios.default.put(baseURL + endPoint, data, {
          headers: _objectSpread(_objectSpread({}, defaultHeaders), headers)
        }).then(_ref4 => {
          let {
            data
          } = _ref4;
          return data;
        });
      },
      makeDeleteRequest: (endPoint, data, headers) => {
        return _axios.default.delete(baseURL + endPoint, data, {
          headers: _objectSpread(_objectSpread({}, defaultHeaders), headers)
        }).then(_ref5 => {
          let {
            data
          } = _ref5;
          return data;
        });
      },
      makeGraphRequest: (endPoint, data, headers) => {
        return _axios.default.delete(baseURL + endPoint, data, {
          headers: _objectSpread(_objectSpread({}, defaultHeaders), headers)
        }).then(_ref6 => {
          let {
            data
          } = _ref6;
          return data;
        });
      }
    };
    return _objectSpread(_objectSpread({}, acc), {}, {
      [key]: networkRequests
    });
  }, {}));

  console.log(services);
  return [services];
}