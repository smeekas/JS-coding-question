function once<T extends (...args: any[]) => any>(fn: T) {
  let isCalled = false;
  let result: any;
  return function (...args: Parameters<T>): ReturnType<T> {
    if (isCalled) {
      return result;
    }
    isCalled = true;
    //original function should have context(this) of current function body. so we are passing current function's context to original function.
    //otherwise original function will have context(this) of windows(global);
    result = fn.apply(this as any, args);
    result = fn(...args);
    return result;
  };
}
