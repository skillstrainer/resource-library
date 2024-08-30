"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRequestService;
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
var _config = require("../config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  return [services];
}