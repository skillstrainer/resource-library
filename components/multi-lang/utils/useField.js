"use strict";

require("core-js/modules/es.weak-map.js");
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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  const defaultValue = typeof dv === "string" && dv || (Array.isArray(children) ? children.join("\n") : children);

  // Events
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