function wrap<T extends object>(obj: T) {
  if (!Array.isArray(obj)) return obj;
  return new Proxy(obj, {
    set(target, property, value) {
      if (property in target) {
        target[property as keyof T] = value; //indexes which are present, Symbols, Iterators and other array properties and methods.
        return true;
      } else if (typeof property !== "symbol") {
        const index = +property;

        if (typeof index === "number" && !Number.isNaN(index)) {
          if (index > 0) {
            target[index] = value;
          } else {
            //ex. -2 and length is 5 so 5-2=3rd element. if -6 or -10 is given them we will throw Error
            const length = target.length;
            const newIndex = (length + index) % length;
            if (newIndex < 0) throw new Error();
            target[newIndex] = value;
          }
          return true;
        } else if (typeof property === "string") {
          //to support any other arbitrary key value to array
          target[property as keyof T] = value;
          return true;
        }
        return false;
      } else {
        return false;
      }
    },
    get(target, property) {
      if (property in target) {
        return target[property as keyof T]; //indexes which are present, Symbols, Iterators and other array properties and methods.
      } else if (typeof property !== "symbol") {
        const index = +property;
        if (index && index > 0) return target[index];
        else if (index < 0) {
          //ex. -2 and length is 5 so 5-2=3rd element. if -6 or -10 is given them we will return undefined.
          const newIndex = (target.length + index) % target.length;
          return target[newIndex];
        }
        return false;
      } else {
        return false;
      }
    },
  });
}
const originalArr = [1, 2, 3];
const arr = wrap(originalArr);

// console.log(...arr)

// console.log(arr[0]) // 1
// console.log(arr[1]) // 2
// console.log(arr[2]) // 3
// console.log(arr[3]) // undefined
// console.log(arr[-1]) // 3
// console.log(arr[-2]) // 2
// console.log(arr[-3]) // 1
// console.log(arr[-4]) // undefined
