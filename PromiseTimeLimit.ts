const timeLimit = function <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  t: number
) {
  // we have to return modified function
  return async function (...args: Parameters<T>) {
    let isFinished = false;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //if execution is not finished yet then stop execution
        if (!isFinished) reject("Time limit exceed");
      }, t);
      //call original function with received arguments
      fn(...args)
        .then((data) => {
          isFinished = true; //mark execution as finished and resolve with received data
          resolve(data);
        })
        .catch((err) => {
          isFinished = true; //mark execution as finished and reject with received error
          reject(err);
        });
    });
  };
};

// examples

function myFunction(data: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 300);
  });
}
const newFunction = timeLimit(myFunction, 500);   
newFunction("resolved promise!!").then(console.log).catch(console.log);
