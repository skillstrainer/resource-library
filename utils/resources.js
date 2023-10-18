"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataFromPincode = exports.countries = void 0;
require("core-js/modules/es.promise.js");
var _pincodeResolvers = require("./resources/pincode-resolvers");
var _countries = _interopRequireDefault(require("./resources/countries.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Address
const countries = _countries.default.map(c => ({
  id: c["alpha-3"],
  name: c.name,
  iso: c["alpha-3"]
}));
exports.countries = countries;
const getDataFromPincode = async _ref => {
  let {
    country,
    pincode
  } = _ref;
  return _pincodeResolvers.resolvers[country] && (await _pincodeResolvers.resolvers[country](pincode));
};
exports.getDataFromPincode = getDataFromPincode;