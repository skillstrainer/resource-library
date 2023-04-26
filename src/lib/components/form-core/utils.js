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

export const getObjectSchema = (field, fieldValue) => {
  const resolveSingleFieldSchema = (field, fieldValue) => {
    let schema;

    if (field.type === "object") schema = getObjectSchema(field, fieldValue);
    else schema = field.schema || yup.string();

    if (field.required) {
      if (typeof schema.required === "function")
        schema = schema.required(field.label + " is required");
    } else schema = schema.nullable();

    return schema;
  };

  return yup.object().shape(
    Object.keys(field.fields).reduce((fieldSchema, subFieldName) => {
      const subfield = field.fields[subFieldName];
      const subFieldLabel = subfield.label;
      const subfieldValue = fieldValue && fieldValue[subFieldName];

      if (subfield.repeat) {
        // Subfield is repeatable
        fieldSchema[subFieldName] = yup.array();

        if (
          (subfield.type === "object" &&
            typeof subfield.fields === "function") ||
          (subfield.type !== "object" && typeof subfield.schema == "function")
        ) {
          // Subfield schema requires resolution
          const subFieldSchemaList = [];

          for (const [subfieldValueItemIndex, subfieldValueItem] of (
            subfieldValue || []
          ).entries()) {
            const singleField = {};

            if (subfield.type === "object")
              Object.assign(singleField, {
                ...subfield,
                repeat: false,
                fields: subfield.fields({ value: subfieldValueItem }),
              });
            else
              Object.assign(singleField, {
                ...subfield,
                repeat: false,
                schema: subfield.schema({ value: subfieldValueItem }),
              });

            const subfieldChildSchema = resolveSingleFieldSchema(
              singleField,
              subfieldValueItem
            );

            subFieldSchemaList.push(subfieldChildSchema);
          }

          fieldSchema[subFieldName] = fieldSchema[subFieldName].of(
            yup.lazy((_, opts) => {
              const index = Number(
                opts.path.split("[").slice(-1)[0].split("]")[0]
              );
              console.log(subFieldSchemaList, index);
              return subFieldSchemaList[index];
            })
          );
        } else {
          // Subfield schema doesn't require resolution
          const subfieldSchema = resolveSingleFieldSchema(
            {
              ...subfield,
              repeat: false,
            },
            subfieldValue
          );

          fieldSchema[subFieldName] =
            fieldSchema[subFieldName].of(subfieldSchema);
        }

        // Handling requirement
        if (subfield.required)
          fieldSchema[subFieldName] = fieldSchema[subFieldName]
            .min(1, subFieldLabel + " is required")
            .required(subFieldLabel + " is required");
        else fieldSchema[subFieldName] = fieldSchema[subFieldName].nullable();
      } else {
        const subfieldSchema = resolveSingleFieldSchema(
          subfield,
          subfieldValue
        );

        fieldSchema[subFieldName] = subfieldSchema;
      }

      return fieldSchema;
    }, {})
  );
};

export const getTypesFromItems = (rootField, rootValue) => {
  const types = {};

  const rec = (field, value) => {
    if (field.type === "object") {
      const iterateOverFieldsInstance = (fieldsInstance, value) => {
        Object.keys(fieldsInstance).forEach((subFieldKey) => {
          rec(fieldsInstance[subFieldKey], value[subFieldKey]);
        });
      };

      if (typeof field.fields === "function") {
        value.forEach((v) => {
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

export const formatBySchema = (objField, fieldSchema) => {
  let result;
  if (fieldSchema.repeat && Array.isArray(objField)) {
    result = objField.map((value) => {
      const schema = resolveFieldProps(fieldSchema, "", value);
      return formatBySchema(value, { ...fieldSchema, repeat: false });
    });
  } else {
    const schema = resolveFieldProps(fieldSchema, "", objField);
    if (schema.type === "object" && objField) {
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
  lowPCollection = _.cloneDeep(lowPCollection);
  highPCollection = _.cloneDeep(highPCollection);

  const all = { ...lowPCollection };
  Object.keys(highPCollection).map((pluginKey) => {
    if (all[pluginKey])
      Object.assign(all[pluginKey], highPCollection[pluginKey]);
    else all[pluginKey] = highPCollection[pluginKey];
  });
  return all;
};

export const createPlugin = (config) => ({ ...config });
