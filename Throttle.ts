function throttle<T extends (...args: any[]) => any>(func: T, delay: number) {
  let isFunctionExecuting = false;
  let lastArgs: Parameters<T> | null = null;
  return function (...args: Parameters<T>) {
    if (!isFunctionExecuting) {
      isFunctionExecuting = true;
      setTimeout(() => {
        isFunctionExecuting = false;
        if (lastArgs) {
          func.apply(this, lastArgs);
          lastArgs = null;
        }
      }, delay);
      func.apply(this, args);
    } else {
      lastArgs = args;
    }
  };
}
    