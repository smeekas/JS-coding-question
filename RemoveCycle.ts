function removeCycle<T extends object>(obj: Partial<T>, set = new Set()) {
  if (obj === null) return obj;
  if (typeof obj !== "object") return obj;

  const keys = Object.keys(obj);
  set.add(obj);
  keys.forEach((keyItem) => {
    const key = keyItem as keyof T;
    const value = obj[key];
    if (set.has(value)) {
      obj[key] = undefined;
    } else if (typeof obj[key] === "object") {
      obj[key] = removeCycle(value as object, set) as T[keyof T];
    }
  });
  return obj;
}
