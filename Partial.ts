function partial<T extends (...args: any[]) => any>(
  fn: T,
  ...argsWithPlaceholder: any[]
) {
  const savedArgs = argsWithPlaceholder; //received args with placeholders
  return function (...args: any[]) {
    //args which we have to replace with placeholder and append remaining ones
    let index = 0;
    const newArgs = savedArgs.map((argItem) => {
      if (argItem === partial.placeholder) { 
        //if savedArg item is placeholder then replace from with arg Item
        const newArgFromArg = args[index];
        index++;
        return newArgFromArg;
      }
      return argItem;
    });
    const remainingArgs = args.slice(index);
    return fn.call(this, ...newArgs, ...remainingArgs);
  };
}
partial.placeholder = Symbol();
