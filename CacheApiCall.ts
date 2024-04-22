const generateKey = <T extends object>(path: string, obj: T): string => {
  const objectKeys = Object.keys(obj)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => {
      const keyItem = key as keyof T;
      if (typeof obj[keyItem] === "object") {
        return `${key}:${generateKey(path, obj[keyItem] as object)}`;
      }
      return `${key}:${obj[keyItem]}`;
    })
    .join("&");
  return path + objectKeys;
};
type MapValue = { result: object; date: number };

function cachedApiCall(limit: number) {
  const map = new Map<string, MapValue>();
  return async function <T extends object>(
    path: Parameters<typeof fetch>[0],
    config?: T
  ) {
    const key = generateKey(path.toString(), config ?? {});
    if (map.has(key)) {
      if (Math.abs(map.get(key)!.date - Date.now()) < limit) {
        return map.get(key)!.result;
      }
    }
    const result = await fetch(path).then((res) => res.json());
    map.set(key, { result, date: Date.now() });
    return result;
  };
}
const call = cachedApiCall(3000);
call("https://jsonplaceholder.typicode.com/todos/1", { keyword: "dev" }).then(
  (a) => console.log(a)
);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {
    keyword: "dev1",
  }).then((a) => console.log(a));
}, 2500);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {
    keyword: "dev1",
  }).then((a) => console.log(a));
}, 4000);
