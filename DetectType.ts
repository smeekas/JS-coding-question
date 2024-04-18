function detectType<T>(data: T) {
  if (data === null) return "null";
  if (data === undefined) return "undefined";
  return (Object(data) as Object).constructor.name.toLowerCase();
}

console.log(detectType(1)); // 'number'
console.log(detectType(new Map())); // 'map'
console.log(detectType([])); // 'array'
console.log(detectType(null)); // 'null'
console.log(detectType(new Date())); //Date
