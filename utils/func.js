"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wireEventValue = exports.convertToPathValuePairs = void 0;
require("core-js/modules/es.json.stringify.js");
// returns an object as a path => value map
const convertToPathValuePairs = inp => {
  JSON.stringify(inp);
  const rec = obj => {
    const map = {};
    if (Array.isArray(obj)) obj.forEach((item, index) => {
      const subMap = rec(item);
      if (subMap && typeof subMap === "object") Object.keys(subMap).forEach(subKey => map["[".concat(index, "]").concat(subKey)] = subMap[subKey]);else map["[".concat(index, "]")] = subMap;
    });else if (obj && typeof obj === "object") {
      Object.keys(obj).forEach(key => {
        const value = rec(obj[key]);
        if (value && typeof value === "object") {
          Object.keys(value).forEach(subKey => map[".".concat(key).concat(subKey)] = value[subKey]);
        } else map[".".concat(key)] = value;
      });
    } else return obj;
    return map;
  };
  const result = rec(inp);
  if (!Array.isArray(inp) && typeof inp === "object") {
    Object.keys(result).map(key => {
      result[key.substring(1)] = result[key];
      delete result[key];
    });
  }
  return result;
};
exports.convertToPathValuePairs = convertToPathValuePairs;
const wireEventValue = f => e => f(e.target.value);
exports.wireEventValue = wireEventValue;