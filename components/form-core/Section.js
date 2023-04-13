"use strict";

require("core-js/modules/es.object.assign.js");

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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    }; // LIST UTILS END


    content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ToggleList.default, null, insertable && /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: "btn-primary mt-3 mb-3 ".concat((insertableProps === null || insertableProps === void 0 ? void 0 : (_insertableProps$butt = insertableProps.button) === null || _insertableProps$butt === void 0 ? void 0 : _insertableProps$butt.className) || ""),
      onClick: () => insert()
    }, (insertableProps === null || insertableProps === void 0 ? void 0 : (_insertableProps$butt2 = insertableProps.button) === null || _insertableProps$butt2 === void 0 ? void 0 : _insertableProps$butt2.label) || "Insert"), new Array(repeatLength).fill("").map((_, index) => {
      const itemName = "".concat(key, "[").concat(index, "]");
      const field = (0, _utils.resolveFieldProps)(fieldProto, itemName, fieldValue && fieldValue[index]);
      const {
        repeatClassName,
        repeatableStyle
      } = field; // wrapListItem formats the list items based on the list configuration

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

var _default = FormSection;
exports.default = _default;