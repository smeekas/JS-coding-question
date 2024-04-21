function customIsEqual(args1: any[], args2: any[]) {
  if (args1.length !== args2.length) return false;
  for (let i = 0; i < args1.length; i++) {
    if (args1[i] !== args2[i]) return false;
  }
  return true;
}

function memoizeOne<T extends (...args: any[]) => any>(
  func: T,
  isEqual?: (args: Parameters<T>, lastArgs: Parameters<T>) => boolean
) {
  let lastArgs: null | Parameters<T> = null;
  let savedResult: ReturnType<T> | null = null;
  let lastThis: any | null = null;

  return function (...newArgs: Parameters<T>) {
    if (lastArgs) {
      const isBothArgsEqual = isEqual
        ? isEqual(newArgs, lastArgs)
        : customIsEqual(newArgs, lastArgs);
      if (isBothArgsEqual && lastThis === this) {
        //if args are equal and this on which function is called is also same then directly return the result
        return savedResult as ReturnType<T>;
      } else {
        // if args are no same as previous then store current args and this(context) and call original function and save result
        lastArgs = newArgs;
        lastThis = this;
        const result = func.apply(this, newArgs);
        savedResult = result;
        return savedResult as ReturnType<T>;
      }
    } else {
      // if args do not exists then store current args and this(context) and call original function and save result
      lastArgs = newArgs;
      lastThis = this;
      const result = func.apply(this, newArgs);
      savedResult = result;
      return savedResult as ReturnType<T>;
    }
  };
}
