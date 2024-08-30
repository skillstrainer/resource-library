"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _AccordionItem = require("../shared/AccordionItem");
var _lodash = _interopRequireDefault(require("lodash"));
var _react = _interopRequireDefault(require("react"));
var _Field = _interopRequireDefault(require("./Field"));
var _SerialableListItem = _interopRequireDefault(require("./Section/SerialableListItem"));
var _ToggleList = _interopRequireWildcard(require("./ToggleList"));
var _utils = require("./utils");
var _FormErrors = _interopRequireDefault(require("./FormErrors"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const FormSection = props => {
  const {
    fields
  } = props;
  return Object.keys(fields).map(_key => /*#__PURE__*/_react.default.createElement(FormSectionUnit, _objectSpread(_objectSpread({}, props), {}, {
    _key
  })));
};
const FormSectionUnit = props => {
  const {
    fields,
    formProps,
    prefix
  } = props;
  let {
    _key: key
  } = props;
  const {
    setFieldValue,
    values
  } = formProps;
  const fieldProto = fields[key];
  if (prefix) key = prefix + "." + key;
  const fieldValue = _lodash.default.get(values, key);
  const repeatLength = fieldValue && fieldValue.length || 0;
  const {
    repeat,
    hide,
    insertable,
    insertableProps,
    collapsible,
    collapsibleProps,
    serialable,
    className,
    label,
    style,
    required
  } = (0, _utils.resolveFieldProps)(fieldProto, key, fieldValue);
  const labelComponent = /*#__PURE__*/_react.default.createElement("div", {
    className: "block text-sm font-medium text-japanese_indigo"
  }, label, " ", required && /*#__PURE__*/_react.default.createElement("span", {
    className: "text-red-600"
  }, "*"), /*#__PURE__*/_react.default.createElement(_FormErrors.default, {
    _key: key,
    formProps: formProps
  }));
  if (hide) return null;
  let content;
  if (repeat) {
    var _insertableProps$butt, _insertableProps$butt2;
    // Field is a list

    // LIST UTILS START
    const insert = () => {
      let fieldValue = _lodash.default.get(values, key);
      if (fieldValue) {
        setFieldValue(key, [...fieldValue, ""]);
      } else setFieldValue(key, [""]);
    };
    const remove = index => {
      let fieldValue = _lodash.default.get(values, key).filter((e, idx) => idx !== index);
      if (!fieldValue.length) fieldValue = undefined;
      setFieldValue(key, fieldValue);
    };
    const move = (position, vector) => {
      if (position + vector >= 0 && position + vector <= fieldValue.length - 1) {
        const list = fieldValue;
        const item = list.splice(position, 1)[0];
        list.splice(position + vector, 0, item);
        setFieldValue(key, [...list]);
      }
    };
    // LIST UTILS END

    content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ToggleList.default, null, insertable && /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: "btn-primary mt-3 mb-3 ".concat((insertableProps === null || insertableProps === void 0 || (_insertableProps$butt = insertableProps.button) === null || _insertableProps$butt === void 0 ? void 0 : _insertableProps$butt.className) || ""),
      onClick: () => insert()
    }, (insertableProps === null || insertableProps === void 0 || (_insertableProps$butt2 = insertableProps.button) === null || _insertableProps$butt2 === void 0 ? void 0 : _insertableProps$butt2.label) || "Insert"), new Array(repeatLength).fill("").map((_, index) => {
      const itemName = "".concat(key, "[").concat(index, "]");
      const field = (0, _utils.resolveFieldProps)(fieldProto, itemName, fieldValue && fieldValue[index]);
      const {
        repeatClassName,
        repeatableStyle
      } = field;

      // wrapListItem formats the list items based on the list configuration
      return wrapListItem({
        key: index + "",
        serialable,
        seriableItemProps: {
          index,
          moveFn: move,
          className: repeatClassName,
          style: repeatableStyle || {}
        },
        collapsible,
        collapsibleItemProps: collapsible && {
          title: fieldValue && fieldValue[index] && collapsibleProps.title(fieldValue[index]) || /*#__PURE__*/_react.default.createElement("span", {
            className: "i text-gray-500"
          }, collapsibleProps.emptyTitle || "Untitled"),
          className: repeatClassName
        } || {},
        children: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, field.type !== "hidden" ? /*#__PURE__*/_react.default.createElement("div", {
          className: "form-section"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "w-full flex justify-end items-center"
        }, /*#__PURE__*/_react.default.createElement("button", {
          className: "btn-danger",
          style: {
            padding: "0.25rem 0.5rem"
          },
          onClick: () => remove(index),
          type: "button"
        }, /*#__PURE__*/_react.default.createElement("box-icon", {
          name: "trash",
          color: "#fff",
          size: "sm"
        }), " ", /*#__PURE__*/_react.default.createElement("span", {
          className: "ml-1"
        }, "Remove"))), /*#__PURE__*/_react.default.createElement("div", {
          className: "flex flex-col w-full"
        }, /*#__PURE__*/_react.default.createElement(_Field.default, {
          formProps: formProps,
          field: field,
          name: itemName
        }), /*#__PURE__*/_react.default.createElement(_FormErrors.default, {
          _key: "".concat(key, ".").concat(index),
          formProps: formProps
        }))) : /*#__PURE__*/_react.default.createElement(_Field.default, {
          formProps: formProps,
          field: field,
          name: itemName
        }))
      });
    })));
    content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, labelComponent, content);
  } else {
    // Field is not a list
    const field = (0, _utils.resolveFieldProps)(fieldProto, key, fieldValue);
    if (field.type === "hidden") content = /*#__PURE__*/_react.default.createElement(_Field.default, {
      formProps: formProps,
      field: field,
      name: key
    });else content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, labelComponent, /*#__PURE__*/_react.default.createElement("div", {
      className: "form-field " + (className || "") + " " + (field.type === "grapes-sections" && "w-full" || ""),
      style: _objectSpread({}, style || {})
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "flex flex-col"
    }, /*#__PURE__*/_react.default.createElement(_Field.default, {
      formProps: formProps,
      field: field,
      name: key
    }))));
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "my-2"
  }, content);
};
const ToggleListWrapper = props => /*#__PURE__*/_react.default.createElement(_ToggleList.ToggleListItem, null, itemProps => /*#__PURE__*/_react.default.createElement(_AccordionItem.AccordionItem, _extends({}, itemProps, {
  title: props.title
}), props.children));
const wrapListItem = _ref => {
  let {
    serialable,
    serialableItemProps,
    collapsible,
    collapsibleItemProps,
    children
  } = _ref;
  const collapsibleItem = collapsible ? /*#__PURE__*/_react.default.createElement(ToggleListWrapper, collapsibleItemProps, children) : /*#__PURE__*/_react.default.createElement("div", null, children);
  return serialable ? /*#__PURE__*/_react.default.createElement(_SerialableListItem.default, serialableItemProps, collapsibleItem) : /*#__PURE__*/_react.default.createElement("div", null, collapsibleItem);
};
var _default = exports.default = FormSection;