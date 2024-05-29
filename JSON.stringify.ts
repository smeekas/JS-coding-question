function stringify<T>(obj: T) {
  if (obj === null) return "null";
  if (obj === undefined) return "null";
  if (obj === Infinity) return "null";
  if (obj instanceof Date) return `"${obj.toISOString()}"`; //date have another ""
  if (typeof obj === "bigint") throw new Error();
  if (typeof obj === "symbol") return undefined; //normal symbol returns undefined and in array or object it turns into null
  if (Object.is(NaN, obj)) return "null"; //NaN cannot be checked with ===
  if (typeof obj === "number") return obj.toString();
  if (typeof obj === "string") return `"${obj}"`; //string is in ""
  if (typeof obj === "boolean") return `${obj}`;
  if (Array.isArray(obj)) {
    const reduced: unknown[] = obj.map((item) => {
      const newVal = stringify(item);
      if (newVal === undefined) return "null"; // in array symbol turns into null
      return newVal;
    });
    return `[${reduced.join(",")}]`;
  }
  if (typeof obj === "object") {
    // object, set, map etc...
    // stringified set & map should include enumerable keys & should not include values store in them
    // ex. const m=new Map(); m.style="red"; => '{"style":"red"}'
    //in stringified object non-enumerable properties should be avoided.
    const keys = Object.keys(obj); //gives enumerable keys only
    const reduced = keys.reduce<Array<unknown>>((acc, curr) => {
      const currValue = obj[curr as keyof T];
      if (Object.is(currValue, undefined)) {
        return acc; //from object if value is symbol then we should avoid that property
      }
      acc.push(`"${curr}":${stringify(currValue)}`);
      return acc;
    }, []);
    return `{${reduced.join(",")}}`;
  }
}
