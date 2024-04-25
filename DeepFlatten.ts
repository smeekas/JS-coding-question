function deepFlatten<T>(obj: T) {
  if (obj === null) return obj;
  if (obj === undefined) return obj;
  if (typeof obj !== "object") return obj;

  const keys = Object.keys(obj);
  const result: { [keys: string]: any } = {};

  keys
    .sort((a, b) => a.localeCompare(b))
    .forEach((keyItem) => {
      const key = keyItem as keyof T;
      const value = obj[key];

      if (typeof value === "object") {
        // it can be array or object or null.
        const nestedObj = deepFlatten(value);
        // deeply flattened nested object.

        if (nestedObj === null) {
          result[keyItem] = null;
        } else if (nestedObj === undefined) {
          result[keyItem] = undefined;
        } else if (typeof nestedObj === "object") {
          Object.keys(nestedObj)
            .sort((a, b) => a.localeCompare(b))
            .forEach((nestedKeyItem) => {
              //store nested object with combination of current object key
              //{current-obj-key}.{nested-obj-key}=value
              result[keyItem + "." + nestedKeyItem] =
                nestedObj[nestedKeyItem as keyof typeof nestedObj];
            });
        } else {
          result[keyItem] = value;
        }
      } else {
        // value can be string, number, undefined etc...
        result[keyItem] = value;
      }
    });
  return result;
}
