import * as yup from "yup";
import _ from "lodash";

export const formatObject = ({ data, changeKeys, deleteKeys }) => {
  data = _.cloneDeep(data);
  Object.keys(data).map((originalKey) => {
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

export const getSchema = (field) => {
  let result;
  if (field.type == "object") {
    result = {};
    const f = Object.keys(field.fields).map((_f) => {
      result[_f] = getSchema(field.fields[_f]);
    });
    result = yup.object().shape(result);
  } else {
    result = field.schema;
    if (field.required && result && typeof result.required === "function")
      result = result.required(`${field.label} is required`);
  }

  if (field.repeat) return yup.array().of(result);
  else return result;
};

export const formatBySchema = (objField, fieldSchema) => {
  let result;
  if (fieldSchema.repeat && Array.isArray(objField)) {
    result = objField.map((value) => {
      const schema = resolveFieldProps(fieldSchema, "", value);
      return formatBySchema(value, { ...fieldSchema, repeat: false });
    });
  } else {
    const schema = resolveFieldProps(fieldSchema, "", objField);
    if (schema.type == "object" && objField) {
      result = {};
      const fields = Object.keys(schema.fields);
      fields.map((key) => {
        result[key] = formatBySchema(objField[key], schema.fields[key]);
      });
    } else result = objField;
  }

  return result;
};

export const eventify = (value) => ({ target: { value } });

export const selectOption = (label, value) => ({ label, value });

// function to resolve field props if they are functions
export const resolveFieldProps = (fieldProto, key, fieldValue) => {
  return Object.keys(fieldProto)
    .map((prop) => {
      let propValue;

      if (typeof fieldProto[prop] === "function")
        propValue = fieldProto[prop]({ key, value: fieldValue });
      else propValue = fieldProto[prop];

      return [prop, propValue];
    })
    .reduce((acc, cur) => {
      acc[cur[0]] = cur[1];
      return acc;
    }, {});
};

export const deepMapObj = (obj, fn) => {
  if (Array.isArray(obj)) {
    fn(obj, { type: "array" });
    obj.forEach((item) => deepMapObj(item, fn));
  } else if (typeof obj === "object" && obj) {
    fn(obj, { type: "obj" });
    Object.values(obj).forEach((item) => deepMapObj(item, fn));
  } else fn(obj, { type: "primitive" });
};

export const checkPlugin = (plugin = {}, name) => {
  if (typeof plugin.Component !== "function") {
    throw {
      message: `There was an error in the plugin: ${name}. Component is not a function`,
    };
  }
  return true;
};
export const checkPlugins = (plugins) => {
  for (const pluginKey in plugins) checkPlugin(plugins[pluginKey], pluginKey);
  return true;
};

export const mergePlugins = (lowPCollection, highPCollection) => {
  const all = { ...lowPCollection };
  Object.keys(highPCollection).map((pluginKey) => {
    if (all[pluginKey])
      Object.assign(all[pluginKey], highPCollection[pluginKey]);
    else all[pluginKey] = highPCollection[pluginKey];
  });
  return all;
};

export const createPlugin = (config) => ({ ...config });
