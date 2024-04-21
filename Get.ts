type DataType = { [key: string]: DataType | any } | Array<DataType | any>;

function get(
  dataObj: DataType,
  key: string | Array<string>,
  defaultValue?: any
) {
  if (Array.isArray(key) && key.length === 0) return undefined; //edge case
  if (typeof key === "string" && key.length === 0) return undefined; //edge case

  const keyArr = Array.isArray(key)
    ? key
    : key.replaceAll("[", ".").replaceAll("]", "").split(".").filter(Boolean);
  // [1].count[0] => 1.count.0 => [1,"count", 0]

  let currValue: DataType | string | number | undefined = dataObj;
  // we iterate over keys, accessing and storing values according to keys in currValue
  keyArr.forEach((keyItem) => {
    if (!isNaN(+keyItem) && Array.isArray(currValue)) {
      // current currValue is Array
      currValue = currValue[+keyItem];
    } else if (typeof currValue === "object" && !Array.isArray(currValue)) {
      // current currValue is Object
      currValue = currValue[keyItem];
    }
  });
  if (currValue === undefined) return defaultValue;
  return currValue;
}
// get({ developer: "Software Engineer" }, "developer"); // => 'Software Engineer'
// get({ developer: { firstName: "Tom", lastName: "Cruz" } }, "developer.lastName"); //=>'Cruz
// get([{ developer: "Tom" }, { count: [0, 1] }], "[1].count[0]") //=>0
// get([{ developer: "Tom" }, { count: [0, 1] }], "[1].count[3]") //=>undefined
// get([{ developer: "Tom" }, [0, null]], "[1][1]"); //=>null
// get({ developer: { firstName: "Tom", lastName: "Cruz" } }, "");=>undefined
