function cloneDeep<T extends any>(obj: T, map = new Map()) {
  //map is used only to solve issue of circular reference
  /*
      const result = [];
      map.set("key", result);
      now if we update result and do map.get("key") we will have updated value
      so wherever we do map.get(key) and use object/array returned by map It will be updated even if we mutate it later
    */
  if (map.has(obj)) return map.get(obj) as T;

  if (Array.isArray(obj)) {
    //typeof array is object so we have to handle it before object checking
    //if received object is array then go through array (element can be anything) and clone them
    const result: any[] = [];
    map.set(obj, result);
    for (let index in obj) {
      result[index] = cloneDeep(obj[index], map);
    }
    return result as T;
  } else if (obj === null) {
    //typeof null is object so we have to handle it before object checking
    return obj;
  } else if (typeof obj === "object") {
    const newObj = Object(obj);

    const result: Partial<typeof newObj> & { [key: symbol]: any } = {};

    map.set(newObj, result);
    [...Object.keys(newObj)].forEach((keyItem) => {
      //copy all keys
      const newKey = keyItem;
      result[newKey] = cloneDeep(newObj[newKey], map);
    });

    [...Object.getOwnPropertySymbols(newObj)].forEach((keyItem) => {
      //copy all symbols. since we are cloning we cannot use same symbol as key. value will be same
      const sym = Symbol();
      result[sym] = cloneDeep(newObj[keyItem], map);
    });

    return result as T;
  } else {
    //typeof undefined, string, number, boolean etc....
    return obj as T;
  }
}

// Example of circular reference
// const arr = [1, 2];
// arr[2] = { a: arr };
