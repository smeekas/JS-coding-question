function isEqual<T, U>(obj1: T, obj2: U, mySet = new Set()): boolean {
    if (typeof obj1 !== typeof obj2) return false; //type of data is not same so return false;
    if ((obj1 as unknown) === (obj2 as unknown)) return true; // if they are same then just return true. ex. 1,"a",null etc..
  
    //set is used to handle circular reference problem
    if (mySet.has(obj1) && mySet.has(obj2)) return true;
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      //we will add visited array to set
      mySet.add(obj1);
      mySet.add(obj2);
      if (obj1.length !== obj2.length) return false; //length is not same so return false;
      let comparedResult = true; // we will assume that both array is equal. if any one element doesn't match then we will return false
      for (let i = 0; i < obj1.length; i++) {
        if (comparedResult === false) return false;
        if (obj1[i] !== obj2[i]) {
          //if both values not same means it can be object or array which cannot be checked by ===.
          comparedResult = comparedResult && isEqual(obj1[i], obj2[i], mySet);
        }
      }
      return comparedResult;
    } else if (typeof obj1 === "object" && typeof obj2 === "object") {
      if (obj1 === null || obj2 === null) return false;
      //we will add visited object to set
      mySet.add(obj1);
      mySet.add(obj2);
      const keys1 = Object.keys(obj1 as object);
      const keys2 = Object.keys(obj2 as object);
      if (keys1.length !== keys2.length) return false; //number of properties are not same so return false
      let comparedResult = true;
      keys1.forEach((keyItem, index) => {
        if (keyItem in obj1 && keyItem in obj2) {
          comparedResult =
            comparedResult &&
            isEqual(obj1[keyItem as keyof T], obj2[keyItem as keyof U], mySet);
        } else {
          //same key doesn't exists in both object so both object are not same.
          comparedResult = false;
        }
      });
      return comparedResult;
    } else {
      return (obj1 as unknown) === (obj2 as unknown);
    }
  }
  