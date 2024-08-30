"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CKEditorInput = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _utils = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  CKEditor
} = typeof window !== "undefined" ? require("@ckeditor/ckeditor5-react") : {};
const ClassicEditor = typeof window !== "undefined" ? require("@ckeditor/ckeditor5-build-classic") : undefined;
const CKEditorInput = _ref => {
  let {
    name,
    className,
    onChange,
    value
  } = _ref;
  const handleChange = data => {
    if (typeof onChange === "function") {
      onChange(data);
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    key: name,
    className: "".concat(className)
  }, /*#__PURE__*/_react.default.createElement(CKEditor, {
    data: value,
    editor: ClassicEditor,
    onChange: (event, editor) => {
      const data = editor.getData();
      handleChange(data);
    }
  }));
};
exports.CKEditorInput = CKEditorInput;
var _default = exports.default = (0, _utils.createPlugin)({
  Component: CKEditorInput
});