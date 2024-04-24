function circuitBreaker<T extends (...args: any[]) => Promise<any>>(
  func: T,
  retry: number,
  limit: number
) {
  let stopExecution = false;
  let date: null | number = null;

  return function (...args: Parameters<T>) {
    return new Promise((resolve, reject) => {
      const fetcher = () => {
        func
          .apply(this, args)
          .then(resolve) //if fulfilled then resolve it.
          .catch((err) => {
            if (retry > 0) {
              // if retry count is > 0 means we have to retry first.
              retry--;
              fetcher();
            } else {
              // if number of retries are exhausted then we have to stop the execution.
              stopExecution = true;
              date = Date.now();
              setTimeout(() => {
                // we will enable execution from received limit
                stopExecution = false;
              }, limit);
              reject(err); //reject promise with received error.
            }
          });
      };
      if (stopExecution) {
        //if execution is stopped then directly reject the promise.

        reject(
          `try after ${limit - Math.abs(Date.now() - (date ?? Infinity))} ms`
        );
      } else {
        //is execution is not stopped then call our fetcher function.
        fetcher();
      }
    });
  };
}

const promises = (url: string) => {
  return new Promise((res, rej) => {
    fetch(url)
      .then((response) => response.json())
      .then(res)
      .catch(rej);
  });
};

const breaker = circuitBreaker(promises, 2, 3000);
breaker("https://dummyjson.com/use").then(console.log).catch(console.log); //error so we try 2 time again.

setTimeout(() => {
  breaker("https://dummyjson.com/use").then(console.log).catch(console.log); //circuit broke so we will receive lime limit error.
}, 2000);

setTimeout(() => {
  breaker("https://dummyjson.com/users/1").then(console.log).catch(console.log); // successfully able to call the function
}, 4900);
