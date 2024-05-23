function flat<T>(arr: T[], depth: number = Infinity) {
  const reducedArr = arr.reduce<T[]>((acc, curr) => {
    if (Array.isArray(curr) && depth > 0) {
      acc.push(...flat(curr, depth - 1));
      return acc;
    } else {
      acc.push(curr);
      return acc;
    }
  }, []);
  return reducedArr;
}
