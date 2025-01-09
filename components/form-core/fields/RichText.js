"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CKEditorInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _utils = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  CKEditor
} = typeof window !== "undefined" ? require("@ckeditor/ckeditor5-react") : {};
const ClassicEditor = typeof window !== "undefined" ? require("@ckeditor/ckeditor5-build-classic") : undefined;
const CKEditorInput = _ref => {
  let {
    name,
    className,
    onChange,
    value,
    disabled
  } = _ref;
  const editorRef = (0, _react.useRef)(null);
  const handleChange = data => {
    if (typeof onChange === "function") {
      onChange(data);
    }
  };
  (0, _react.useEffect)(() => {
    if (editorRef.current && editorRef.current.editor) {
      editorRef.current.editor.isReadOnly = disabled;
    }
  }, [disabled]);
  return /*#__PURE__*/_react.default.createElement("div", {
    key: name,
    className: "".concat(className)
  }, /*#__PURE__*/_react.default.createElement(CKEditor, {
    ref: editorRef,
    data: value,
    editor: ClassicEditor,
    onReady: editor => {
      editorRef.current = {
        editor
      };
      editor.isReadOnly = disabled;
    },
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