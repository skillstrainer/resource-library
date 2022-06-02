"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMultiLangService;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useMultiLangService(config) {
  const {
    jwtToken,
    accessToken,
    adminApi
  } = config.request;
  const services = {
    publishMarketingWebsite: () => {
      if (!jwtToken || !accessToken) alert("Couldn't perform request. One of the tokens (JWT or Access Token) is missing");else return adminApi.makeGetRequest("publish_changes").then(_ref => {
        let {
          data
        } = _ref;
        return data && alert("Change publishing triggered. It may take a few minutes for the changes to reflect.");
      }).catch(err => console.log(err) || alert("An error occured while publishing changes"));
    }
  };
  return [services, [], {}];
}