"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultPreprocessors = exports.defaultPostprocessors = exports.defaultPlugins = void 0;

var _FileUploader = require("../form-ext/FileUploader");

var _Boolean = _interopRequireDefault(require("./fields/Boolean"));

var _Date = _interopRequireDefault(require("./fields/Date"));

var _DateTime = _interopRequireDefault(require("./fields/DateTime"));

var _Input = _interopRequireDefault(require("./fields/Input"));

var _MultiSelect = _interopRequireDefault(require("./fields/MultiSelect"));

var _Select = _interopRequireDefault(require("./fields/Select"));

var _Textarea = _interopRequireDefault(require("./fields/Textarea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultPreprocessors = [];
exports.defaultPreprocessors = defaultPreprocessors;
const defaultPostprocessors = [];
exports.defaultPostprocessors = defaultPostprocessors;
const defaultPlugins = {
  file: _FileUploader.FileUploaderPlugin,
  select: _Select.default,
  textarea: _Textarea.default,
  date: _Date.default,
  "date-time": _DateTime.default,
  boolean: _Boolean.default,
  "multi-select": _MultiSelect.default,
  input: _Input.default
};
exports.defaultPlugins = defaultPlugins;