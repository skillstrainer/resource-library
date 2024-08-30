"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectOption = exports.resolveFieldProps = exports.mergePlugins = exports.getTypesFromItems = exports.getObjectSchema = exports.formatObject = exports.formatBySchema = exports.eventify = exports.deepMapObj = exports.createPlugin = exports.checkPlugins = exports.checkPlugin = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.dom-collections.iterator.js");
var yup = _interopRequireWildcard(require("yup"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const formatObject = _ref => {
  let {
    data,
    changeKeys,
    deleteKeys
  } = _ref;
  data = _lodash.default.cloneDeep(data);
  Object.keys(data).map(originalKey => {
    if (deleteKeys && deleteKeys.includes(originalKey)) {
      delete data[originalKey];
      return;
    }
    const newKey = changeKeys && changeKeys[originalKey];
    if (newKey) {
      data[newKey] = data[originalKey];
      delete data[originalKey];
    }
  });
  return data;
};
exports.formatObject = formatObject;
const getObjectSchema = (field, fieldValue) => {
  const resolveSingleFieldSchema = (field, fieldValue) => {
    let schema;
    if (field.type === "object") schema = getObjectSchema(field, fieldValue);else schema = field.schema || yup.string();
    if (field.required) {
      if (typeof schema.required === "function") schema = schema.required(field.label + " is required");
    } else schema = schema.nullable();
    return schema;
  };
  return yup.object().shape(Object.keys(field.fields).reduce((fieldSchema, subFieldName) => {
    const subfield = field.fields[subFieldName];
    const subFieldLabel = subfield.label;
    const subfieldValue = fieldValue && fieldValue[subFieldName];
    if (subfield.repeat) {
      // Subfield is repeatable
      fieldSchema[subFieldName] = yup.array();
      if (subfield.type === "object" && typeof subfield.fields === "function" || subfield.type !== "object" && typeof subfield.schema == "function") {
        // Subfield schema requires resolution
        const subFieldSchemaList = [];
        for (const [subfieldValueItemIndex, subfieldValueItem] of (subfieldValue || []).entries()) {
          const singleField = {};
          if (subfield.type === "object") Object.assign(singleField, _objectSpread(_objectSpread({}, subfield), {}, {
            repeat: false,
            fields: subfield.fields({
              value: subfieldValueItem
            })
          }));else Object.assign(singleField, _objectSpread(_objectSpread({}, subfield), {}, {
            repeat: false,
            schema: subfield.schema({
              value: subfieldValueItem
            })
          }));
          const subfieldChildSchema = resolveSingleFieldSchema(singleField, subfieldValueItem);
          subFieldSchemaList.push(subfieldChildSchema);
        }
        fieldSchema[subFieldName] = fieldSchema[subFieldName].of(yup.lazy((_, opts) => {
          const index = Number(opts.path.split("[").slice(-1)[0].split("]")[0]);
          console.log(subFieldSchemaList, index);
          return subFieldSchemaList[index];
        }));
      } else {
        // Subfield schema doesn't require resolution
        const subfieldSchema = resolveSingleFieldSchema(_objectSpread(_objectSpread({}, subfield), {}, {
          repeat: false
        }), subfieldValue);
        fieldSchema[subFieldName] = fieldSchema[subFieldName].of(subfieldSchema);
      }

      // Handling requirement
      if (subfield.required) fieldSchema[subFieldName] = fieldSchema[subFieldName].min(1, subFieldLabel + " is required").required(subFieldLabel + " is required");else fieldSchema[subFieldName] = fieldSchema[subFieldName].nullable();
    } else {
      const subfieldSchema = resolveSingleFieldSchema(subfield, subfieldValue);
      fieldSchema[subFieldName] = subfieldSchema;
    }
    return fieldSchema;
  }, {}));
};
exports.getObjectSchema = getObjectSchema;
const getTypesFromItems = (rootField, rootValue) => {
  const types = {};
  const rec = (field, value) => {
    if (field.type === "object") {
      const iterateOverFieldsInstance = (fieldsInstance, value) => {
        Object.keys(fieldsInstance).forEach(subFieldKey => {
          rec(fieldsInstance[subFieldKey], value[subFieldKey]);
        });
      };
      if (typeof field.fields === "function") {
        value.forEach(v => {
          const fieldsInstance = field.fields(v);
          iterateOverFieldsInstance(fieldsInstance, v);
        });
      } else {
        iterateOverFieldsInstance(field.fields, value);
      }
    } else {
      types[field.type] = true;
    }
  };
  rec(rootField, rootValue);
  return Object.keys(types);
};
exports.getTypesFromItems = getTypesFromItems;
const formatBySchema = (objField, fieldSchema) => {
  let result;
  if (fieldSchema.repeat && Array.isArray(objField)) {
    result = objField.map(value => {
      const schema = resolveFieldProps(fieldSchema, "", value);
      return formatBySchema(value, _objectSpread(_objectSpread({}, fieldSchema), {}, {
        repeat: false
      }));
    });
  } else {
    const schema = resolveFieldProps(fieldSchema, "", objField);
    if (schema.type === "object" && objField) {
      result = {};
      const fields = Object.keys(schema.fields);
      fields.map(key => {
        result[key] = formatBySchema(objField[key], schema.fields[key]);
      });
    } else result = objField;
  }
  return result;
};
exports.formatBySchema = formatBySchema;
const eventify = value => ({
  target: {
    value
  }
});
exports.eventify = eventify;
const selectOption = (label, value) => ({
  label,
  value
});

// function to resolve field props if they are functions
exports.selectOption = selectOption;
const resolveFieldProps = (fieldProto, key, fieldValue) => {
  return Object.keys(fieldProto).map(prop => {
    let propValue;
    if (typeof fieldProto[prop] === "function") propValue = fieldProto[prop]({
      key,
      value: fieldValue
    });else propValue = fieldProto[prop];
    return [prop, propValue];
  }).reduce((acc, cur) => {
    acc[cur[0]] = cur[1];
    return acc;
  }, {});
};
exports.resolveFieldProps = resolveFieldProps;
const deepMapObj = (obj, fn) => {
  if (Array.isArray(obj)) {
    fn(obj, {
      type: "array"
    });
    obj.forEach(item => deepMapObj(item, fn));
  } else if (typeof obj === "object" && obj) {
    fn(obj, {
      type: "obj"
    });
    Object.values(obj).forEach(item => deepMapObj(item, fn));
  } else fn(obj, {
    type: "primitive"
  });
};
exports.deepMapObj = deepMapObj;
const checkPlugin = exports.checkPlugin = function checkPlugin() {
  let plugin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let name = arguments.length > 1 ? arguments[1] : undefined;
  if (typeof plugin.Component !== "function") {
    throw {
      message: "There was an error in the plugin: ".concat(name, ". Component is not a function")
    };
  }
  return true;
};
const checkPlugins = plugins => {
  for (const pluginKey in plugins) checkPlugin(plugins[pluginKey], pluginKey);
  return true;
};
exports.checkPlugins = checkPlugins;
const mergePlugins = (lowPCollection, highPCollection) => {
  lowPCollection = _lodash.default.cloneDeep(lowPCollection);
  highPCollection = _lodash.default.cloneDeep(highPCollection);
  const all = _objectSpread({}, lowPCollection);
  Object.keys(highPCollection).map(pluginKey => {
    if (all[pluginKey]) Object.assign(all[pluginKey], highPCollection[pluginKey]);else all[pluginKey] = highPCollection[pluginKey];
  });
  return all;
};
exports.mergePlugins = mergePlugins;
const createPlugin = config => _objectSpread({}, config);
exports.createPlugin = createPlugin;