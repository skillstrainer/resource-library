"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormErrors;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormErrors(_ref) {
  let {
    _key: key,
    formProps
  } = _ref;
  const {
    attemptedSubmit,
    errors,
    touched
  } = formProps;

  const isFieldTouched = _lodash.default.get(touched, key);

  const fieldErrors = _lodash.default.get(errors, key) || "";
  return (isFieldTouched || attemptedSubmit) && fieldErrors && typeof fieldErrors === "string" && /*#__PURE__*/_react.default.createElement("div", {
    className: "errors text-danger text-red-500"
  }, fieldErrors) || null;
}