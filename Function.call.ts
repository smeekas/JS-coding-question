Function.prototype.mycall = function (thisArg, ...args) {
  const newSym = Symbol(); //our identifier
  //if this is not defined then we will take window (global) else given this
  const newThis = thisArg ? Object(thisArg) : window;
  //we have wrapped this in Object because if primitive values are given then we want to convert them to their Wrapper Object ex. 1=>new Number(1)
  newThis[newSym] = this; //adding original this (function) to new this
  const result = newThis[newSym](...args); // calling it.
  delete newThis[newSym]; //deleting our added variable.
  return result;
};

//above implementation will work in every case except when given context is freezed or sealed.