function curry(func: Function): Function {
  return function curried(...newArgs: unknown[]) {
    // [Symbol.toPrimitive] = () => func.apply(this, newArgs);

    const binded: Function = curried.bind(this, ...newArgs);
    binded["toString"] = () => func.apply(this, newArgs); // arrow because we want parent's this(context)
    return binded;
  };
}

function multiply(...args: number[]) {
  return args.reduce((acc, curr) => acc * curr, 1);
}

const curried = curry(multiply);

console.log(curried(2)(5, 2, 2)(2));
