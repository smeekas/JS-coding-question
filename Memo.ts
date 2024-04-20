function memo<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => any
) {
  const map = new Map(); //we we store key-val (args-result)
  return function (...args: Parameters<T>) {
    let key = resolver ? resolver(...args) : args.join(""); //if resolver exists then use it to get key or use args
    if (map.has(key)) {
      return map.get(key);
    } else {
      const result = func.apply(this, args); 
      map.set(key, result);
      return result;
    }
  };
}
