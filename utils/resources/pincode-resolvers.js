"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _axios2 = _interopRequireDefault(require("axios"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const _axios = function _axios() {
  return (0, _axios2.default)(...arguments).then(_ref => {
    let {
      data
    } = _ref;
    return data;
  });
};
const resolvers = exports.resolvers = {
  IND: pincode => {
    return _axios({
      method: "get",
      url: "https://api.postalpincode.in/pincode/" + pincode
    }).then(data => data[0] && data[0].PostOffice && data[0].PostOffice[0] || {}).then(res => !_lodash.default.isEmpty(res) && {
      district: res.District,
      city_town: res.Name,
      state: res.State
    });
  }
};