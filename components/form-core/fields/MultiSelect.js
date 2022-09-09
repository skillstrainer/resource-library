"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MultiSelect = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _utils = require("../utils");

const _excluded = ["options", "value", "onChange", "className"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const MultiSelect = _ref => {
  let {
    options = [],
    value,
    onChange,
    className
  } = _ref,
      selectProps = _objectWithoutProperties(_ref, _excluded);

  // set value for default selection
  // handle onChange event of the dropdown
  const handleChange = e => {
    e = e.map(option => option.value);

    if (e.length) {
      if (e[e.length - 1] === "#") e = null;else if (e[e.length - 1] === "*") e = options.map(e => e.value);
    } else e = null;

    onChange(e);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-1 col-span-6 sm:col-span-3 ".concat(className)
  }, /*#__PURE__*/_react.default.createElement(_reactSelect.default, _extends({
    style: {
      boxSizing: "border-box"
    }
  }, selectProps, {
    isMulti: true,
    options: options.length === (value || []).length ? [{
      value: "#",
      label: "Deselect All"
    }, ...options] : [{
      value: "*",
      label: "Select All"
    }, ...options],
    value: options.filter(obj => Array.isArray(value) && value.indexOf(obj.value) > -1),
    onChange: handleChange,
    className: "basic-multi-select",
    classNamePrefix: "select"
  })));
};

exports.MultiSelect = MultiSelect;

var _default = (0, _utils.createPlugin)({
  Component: MultiSelect
});

exports.default = _default;