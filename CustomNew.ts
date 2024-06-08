function SuperHero(name: string) {
  this.name = name;
}
function newCreator<T extends (...args: any[]) => any>(
  constructor: T,
  ...args: Parameters<T>
) {
  const obj = {};

  // first we pass empty object to assign all values to passed object.
  const res = constructor.call(obj, ...args);

  if (res && typeof res == "object") {
    // if it returns object then we return that only.
    return res;
  } else {
    // if nothing is returned then in the object (which now have values attached to them), we set object's prototype as function's prototype.
    // obj.__proto__ = constructor.prototype;
    Object.setPrototypeOf(obj, constructor.prototype);
    return obj;
  }
}
const batman = newCreator(SuperHero, "bruce");
const batmanReturns = new SuperHero("bruce 2");

console.log(batman instanceof SuperHero); //true
console.log(batmanReturns instanceof SuperHero); //true

console.log(batman.name)
console.log(batmanReturns.name)
