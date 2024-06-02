function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
  let timer: null | ReturnType<typeof window.setTimeout> = null;
  let savedArgs: unknown[] | null = null;
  let context: null | unknown = null;
  const debounced = function (...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
      savedArgs = null; // we will be storing new args to clear stored args.
    }
    context = this; // save context in case if we want to flush it.
    savedArgs = args; // save argument in case if we want to flush it.
    timer = setTimeout(() => {
      func.apply(context, args);
      savedArgs = null; //function is executed so clear stored args. (this helps if user try to flush after function is executed.)
    }, delay);
  };
  function cancel() {
    if (timer) {
      clearTimeout(timer);
      savedArgs = null; //clear saved args as we want to cancel execution.
    }
  }
  function flush() {
    if (timer) {
      clearTimeout(timer); //first clear timeout.
    }
    if (savedArgs) {
      //if saved args exists means  invocation is pending.
      //invoke the delayed function
      func.apply(context, savedArgs);
      savedArgs = null;
    }
  }
  debounced.cancel = cancel;
  debounced.flush = flush;

  return debounced;
}
