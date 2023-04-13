"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CKEditorInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ckeditor5React = require("@ckeditor/ckeditor5-react");

var _ckeditor5BuildClassic = _interopRequireDefault(require("@ckeditor/ckeditor5-build-classic"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  }, /*#__PURE__*/_react.default.createElement(_ckeditor5React.CKEditor, {
    data: value,
    editor: _ckeditor5BuildClassic.default,
    onChange: (event, editor) => {
      const data = editor.getData();
      handleChange(data);
    }
  }));
};

exports.CKEditorInput = CKEditorInput;

var _default = (0, _utils.createPlugin)({
  Component: CKEditorInput
});

exports.default = _default;