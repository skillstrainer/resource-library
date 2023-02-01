"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectOption = exports.resolveFieldProps = exports.mergePlugins = exports.getObjectSchema = exports.formatObject = exports.formatBySchema = exports.eventify = exports.deepMapObj = exports.createPlugin = exports.checkPlugins = exports.checkPlugin = void 0;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var yup = _interopRequireWildcard(require("yup"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
          return subFieldSchemaList[index];
        }));
      } else {
        // Subfield schema doesn't require resolution
        const subfieldSchema = resolveSingleFieldSchema(_objectSpread(_objectSpread({}, subfield), {}, {
          repeat: false
        }), subfieldValue);
        fieldSchema[subFieldName] = fieldSchema[subFieldName].of(subfieldSchema);
      } // Handling requirement


      if (subfield.required) fieldSchema[subFieldName] = fieldSchema[subFieldName].min(1, subFieldLabel + " is required").required(subFieldLabel + " is required");else fieldSchema[subFieldName] = fieldSchema[subFieldName].nullable();
    } else {
      const subfieldSchema = resolveSingleFieldSchema(subfield, subfieldValue);
      fieldSchema[subFieldName] = subfieldSchema;
    }

    return fieldSchema;
  }, {}));
};

exports.getObjectSchema = getObjectSchema;

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
}); // function to resolve field props if they are functions


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

const checkPlugin = function checkPlugin() {
  let plugin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let name = arguments.length > 1 ? arguments[1] : undefined;

  if (typeof plugin.Component !== "function") {
    throw {
      message: "There was an error in the plugin: ".concat(name, ". Component is not a function")
    };
  }

  return true;
};

exports.checkPlugin = checkPlugin;

const checkPlugins = plugins => {
  for (const pluginKey in plugins) checkPlugin(plugins[pluginKey], pluginKey);

  return true;
};

exports.checkPlugins = checkPlugins;

const mergePlugins = (lowPCollection, highPCollection) => {
  const all = _objectSpread({}, lowPCollection);

  Object.keys(highPCollection).map(pluginKey => {
    if (all[pluginKey]) Object.assign(all[pluginKey], highPCollection[pluginKey]);else all[pluginKey] = highPCollection[pluginKey];
  });
  return all;
};

exports.mergePlugins = mergePlugins;

const createPlugin = config => _objectSpread({}, config);

exports.createPlugin = createPlugin;