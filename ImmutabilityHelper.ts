function update<T, U>(obj: T, command: U) {
  if (command === null || obj === null) {
    return obj;
  } else if (typeof command === "undefined" || typeof obj === "undefined") {
    return obj;
  } else if (typeof command === "object") {
    //this handles both array and object
    for (let key in command) {
      const keyItem = key as keyof U; //key for command object
      const objKeyItem = key as unknown as keyof T; //key for actual object
      switch (keyItem) {
        case "$set": {
          return command[keyItem as keyof U]; //replace with new value so return it.
        }
        case "$merge": {
          if (Array.isArray(obj) || typeof obj !== "object") {
            throw new Error();
          }
          return { ...obj, ...command[keyItem] }; //merge with current value and return it
        }
        case "$apply": {
          console.log(keyItem, obj, command[keyItem]);
          const result = (command[keyItem] as Function)(obj); //apply function to current value and return new value
          return result;
        }
        case "$push": {
          if (Array.isArray(obj)) {
            const newValues = command[keyItem];
            if (Array.isArray(newValues)) {
              obj.push(...newValues); //push new values
            }
            return obj;
          } else {
            throw new Error();
          }
        }
        default:
          // command is not valid means it can be actual key of object or index of array
          if (typeof obj === "object" && objKeyItem in obj) {
            // if key exists then again call update with obj[objKeyItem] and command[keyItem]
            const result = update(obj[objKeyItem], command[keyItem]);
            obj[objKeyItem] = result;
          } else {
            // if key doesn't exists then, obj[objKeyItem] will give undefined.
            //if key doesn't exists means we are trying to set/push something(new key with value)
            // we call update with obj and command[keyItem]
            //set new keys
            obj[objKeyItem] = update(obj, command[keyItem]);
          }
          break;
      }
    }

    return obj;
  }
}
// const state = {
//   a: {
//     b: {
//       c: 1,
//     },
//   },
//   d: 2,
// };

// const newState = update(state, {
//   a: { b: { c: { $apply: (item: any) => item * 20 } } },
// });
// console.log(newState);

// const arr = [1, 2, 3, 4];
// const newArr = update(arr, { $push: [5, 6] });
// console.log(newArr);

// const arr = [1, 2, 3, 4]
// const newArr = update(
//   arr,
//   {10: {$set: 0}}
// )
// console.log(newArr);

// const arr = [1, 2, 3, 4]
// const newArr = update(arr, { 0: { $apply: (item) => item * 2 } })
// console.log(newArr);

// console.log(update([1], { 1: { $set: 2 } }));
