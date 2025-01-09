"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileUploaderPlugin = void 0;
exports.default = FileUploader;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _file = require("../../../utils/file");
var _CapturePhoto = _interopRequireDefault(require("./CapturePhoto"));
var _EditableText = _interopRequireDefault(require("./EditableText"));
var _FilePreview = _interopRequireDefault(require("./FilePreview"));
var _toast = require("../../../services/toast");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function FileUploader(props) {
  const {
    value,
    onChange,
    buttonText = "Upload",
    buttonProps,
    renderUploadButton,
    showCaptureButton,
    renderCaptureButton,
    fileFieldProps = {},
    disabled,
    pluginContext: {
      services = {}
    } = {}
  } = props;
  const fileInputRef = (0, _react.useRef)();
  const getUrl = (services === null || services === void 0 ? void 0 : services.getUrl) || (async val => val);

  /*
   *
   *
   * File list management
   *
   *
   */
  const fileList = (0, _react.useMemo)(() => value || [], [value]),
    setFileList = (0, _react.useCallback)(fileList => onChange(fileList), [onChange]);
  // todo: reconsider the setting of id
  const fileCountRef = (0, _react.useRef)(1);
  (0, _react.useEffect)(() => {
    setFileList(fileList.map(f => _objectSpread(_objectSpread({}, f), {}, {
      id: f.id || fileCountRef.current++ + ""
    })));
  }, []);
  const updateValueList = filesArr => {
    setFileList(filesArr.map(file => ({
      ___file_uploader_component: true,
      id: fileCountRef.current++ + "",
      name: file.name,
      fileData: file
    })));
  };
  const updateFileItem = (itemId, prop) => value => setFileList(fileList.map(item => {
    if (item.id === itemId) item[prop] = value;
    return item;
  }));
  const removeFileItem = fileId => setFileList(fileList.filter(f => f.id !== fileId));
  const clearList = () => setFileList([]);

  /*
   *
   *
   * File preview
   *
   *
   */
  const previewFile = async fileItem => {
    const source = fileItem.fileData ? "file" : "url";
    const data = fileItem.fileData || (await getUrl(fileItem.url));
    const previewData = {
      source,
      data
    };
    await _toast.Toast.prompt(_FilePreview.default, _objectSpread(_objectSpread({}, previewData), {}, {
      onError: msg => alert("Error: " + msg)
    }));
  };

  /*
   *
   *
   * Photo capture
   *
   *
   */
  const capturePhoto = (0, _react.useCallback)(async () => {
    const capturedFiles = await _toast.Toast.prompt(CapturePhotoModalContent, {});
    capturedFiles.forEach(f => {
      const filename = "snapshot-" + fileCountRef.current;
      Object.assign(f, {
        id: fileCountRef.current + "",
        name: filename
      });
      fileCountRef.current++;
    });
    fileList.splice(fileList.length, 0, ...capturedFiles);
    setFileList([...fileList]);
  }, [fileList, fileCountRef, setFileList]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "0",
      height: "0",
      margin: "0",
      padding: "0",
      overflow: "hidden"
    }
  }, /*#__PURE__*/_react.default.createElement("input", _extends({
    disabled: disabled,
    type: "file",
    ref: fileInputRef,
    onChange: e => {
      if (e.target.files.length > 0) {
        // logic seems flawed
        updateValueList([...(fileFieldProps.multiple ? fileList : []),
        // if only single file is allowed, then list should be replaced and not appended
        ...Array.from(e.target.files)]);
      }
    }
  }, fileFieldProps || {}))), /*#__PURE__*/_react.default.createElement("ul", {
    className: "mb-2"
  }, fileList.map(fileItem => /*#__PURE__*/_react.default.createElement("li", {
    className: "flex justify-between items-center p-2 bg-gray-100 rounded text-gray-500 mb-1",
    key: fileItem.id
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "px-2 flex-center",
    onClick: () => previewFile(fileItem)
  }, /*#__PURE__*/_react.default.createElement("box-icon", {
    name: "show",
    color: "gray",
    className: "h-8"
  })), /*#__PURE__*/_react.default.createElement(_EditableText.default, {
    value: fileItem.name,
    onFinish: updateFileItem(fileItem.id, "name")
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("box-icon", fileItem.url ? {
    name: "check",
    color: "green"
  } : {
    name: "dots-horizontal-rounded",
    color: "gray"
  }), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: () => removeFileItem(fileItem.id)
  }, /*#__PURE__*/_react.default.createElement("box-icon", {
    name: "trash",
    color: "red"
  })))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full flex gap-2"
  }, typeof renderUploadButton === "function" ? renderUploadButton({
    onClick: fileInputRef.current.click
  }) : /*#__PURE__*/_react.default.createElement("button", _extends({
    onClick: () => fileInputRef.current.click(),
    className: "button cta w-full flex-center",
    type: "button"
  }, buttonProps || {}), buttonText), showCaptureButton && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, typeof renderCaptureButton === "function" ? renderCaptureButton({
    onClick: capturePhoto
  }) : /*#__PURE__*/_react.default.createElement("button", {
    onClick: capturePhoto,
    className: "button cta w-full flex-center",
    type: "button"
  }, "Capture photo")), !_lodash.default.isEmpty(fileList) && /*#__PURE__*/_react.default.createElement("button", {
    onClick: clearList,
    className: "button cta w-full flex-center",
    type: "button"
  }, "Clear All")));
}
const CapturePhotoModalContent = props => {
  const {
    resolveFn
  } = props;
  return /*#__PURE__*/_react.default.createElement(_CapturePhoto.default, {
    onFinish: images => {
      // should there by a fieldProps.multiple check to prevent multiple images from being uploaded
      resolveFn(images.map((imageDataBase64, index) => ({
        ___file_uploader_component: true,
        fileData: (0, _file.dataURLtoFile)(imageDataBase64, index + "")
      })));
    }
  });
};
const preprocessor = (values, pluginContext) => new Promise((resolve, reject) => {
  let registered = 0;
  let completed = 0;
  const {
    uploadFn
  } = (pluginContext === null || pluginContext === void 0 ? void 0 : pluginContext.services) || {};
  if (!uploadFn) {
    reject({
      message: "There is no upload function provided"
    });
    return;
  }
  const next = ok => {
    if (ok) {
      completed++;
      if (completed === registered) resolve(values);
    } else reject();
  };
  const rec = item => {
    if (!item) return;
    if (item.___file_uploader_component) {
      if (!item.url) {
        registered++;
        uploadFn(item.fileData).then(url => {
          item.url = url;
          delete item.___file_uploader_component;
          delete item.fileData;
          next(true);
        }).catch(err => {
          console.error(err);
          next(false);
        });
      }
    } else {
      if (Array.isArray(item)) item.map(rec);else if (item && typeof item === "object") Object.values(item).map(rec);
    }
  };
  rec(values);
  if (registered === 0) resolve(values);
});
const FileUploaderPlugin = exports.FileUploaderPlugin = {
  Component: FileUploader,
  preprocessor
};