function chunk<T>(inputArr: T[], originalParts: number) {
  const result: Array<T[]> = [];
  let parts = originalParts;
  let partArr: T[] = [];

  inputArr.forEach((element, index) => {
    if (parts > 0) {
      partArr.push(element);
      parts--;
    } else {
      //current parts are over so add constructed array into result
      result.push(partArr);
      // originalParts - 1 because we are adding current element
      parts = originalParts - 1;
      partArr = [];
      partArr.push(element);
    }
  });
  result.push(partArr);
  return result;
}
