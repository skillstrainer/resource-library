"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBasePath = void 0;

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

var _react = require("react");

var _Context = require("../../Context");

const useBasePath = () => {
  const {
    dependency: {
      dependencies
    }
  } = (0, _react.useContext)(_Context.STRLContext);
  const {
    useLocation,
    useParams
  } = dependencies || {};
  if (typeof useLocation !== "function" || typeof useParams !== "function") throw Error({
    msg: "Missing required dependencies: useLocation, useParams"
  });
  const location = useLocation();
  const params = useParams();
  var pathname = location.pathname;
  if (pathname[pathname.length - 1] === "/") pathname = pathname.substring(0, pathname.length - 1);
  return Object.values(params).reduce((path, param) => path.replace("/" + param, ""), pathname);
};

exports.useBasePath = useBasePath;