// returns an object as a path => value map
export const convertToPathValuePairs = (inp) => {
  JSON.stringify(inp);

  const rec = (obj) => {
    const map = {};

    if (Array.isArray(obj))
      obj.forEach((item, index) => {
        const subMap = rec(item);

        if (subMap && typeof subMap === "object")
          Object.keys(subMap).forEach(
            (subKey) => (map[`[${index}]${subKey}`] = subMap[subKey])
          );
        else map[`[${index}]`] = subMap;
      });
    else if (obj && typeof obj === "object") {
      Object.keys(obj).forEach((key) => {
        const value = rec(obj[key]);

        if (value && typeof value === "object") {
          Object.keys(value).forEach(
            (subKey) => (map[`.${key}${subKey}`] = value[subKey])
          );
        } else map[`.${key}`] = value;
      });
    } else return obj;
    return map;
  };

  const result = rec(inp);

  if (!Array.isArray(inp) && typeof inp === "object") {
    Object.keys(result).map((key) => {
      result[key.substring(1)] = result[key];
      delete result[key];
    });
  }

  return result;
};
