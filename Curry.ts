function curry(func: Function): Function {
  const totalArgs = func.length; //total number of function's arguments
  return function curried(...newArgs: unknown[]) {
    if (newArgs.length >= totalArgs) {
      return func.apply(this, newArgs);
    } else {
      return curried.bind(this, ...newArgs);
    }
  };
}

// In above way we are keep binding curried function with new arguments. when we have all arguments we are calling original function.
//another way is that we keep saving arguments in the array instead of binding.