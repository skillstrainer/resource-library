"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useField;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.trim.js");

var _react = _interopRequireWildcard(require("react"));

var _MultiLangBody = require("../MultiLangBody");

var _MultiLangContext = require("../MultiLangContext");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useField(props) {
  const {
    name,
    defaultValue: dv,
    children
  } = props;
  let {
    content: data,
    updateField: _updateField
  } = (0, _react.useContext)(_MultiLangBody.MultiLangBodyContext);
  const {
    editable
  } = (0, _react.useContext)(_MultiLangContext.MultiLangContext);

  let value = _lodash.default.get(data, name);

  const defaultValue = typeof dv === "string" && dv || (Array.isArray(children) ? children.join("\n") : children); // Events

  const basicEvents = {
    onFocus: e => {
      if (e.target.innerHTML === "_") e.target.innerHTML = "";
    },
    onBlur: e => {
      const useValue = ["input", "textarea", "select"].includes(e.currentTarget.nodeName.toLowerCase());
      const value = useValue ? e.target.value : e.target.innerHTML.replace(/&nbsp;/g, "").replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<");

      _updateField(name, value, "onBlur");

      if (value.trim() === "") e.target[useValue ? "value" : "innerHTML"] = "_";
    }
  };
  const events = {
    text: {
      onFocus: basicEvents.onFocus,
      onBlur: basicEvents.onBlur
    }
  };
  return {
    editable,
    updateField: (value, event) => _updateField(name, value, event),
    value,
    defaultValue,
    events: editable && events || {}
  };
}