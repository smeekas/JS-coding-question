Function.prototype.mybind = function (thisArg: any, ...args: any) {
  const fnContext = this;
  return function (...remainingArgs: any[]) {
    const sym = Symbol();
    const objContext = thisArg ? Object(thisArg) : null;
    if (objContext === null) {
      //if no context is given then simply call function;
      return fnContext(...args, ...remainingArgs);
    }
    //else
    //below code is similar to Function.prototype.mycall
    objContext[sym] = fnContext;
    const result = objContext[sym](...args, ...remainingArgs);
    delete objContext[sym];
    return result;
  };
};
