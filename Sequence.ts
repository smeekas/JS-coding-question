type Callback = (error: Error | undefined, data: any) => void;
type AsyncFunc = (callback: Callback, data: any) => void;

const Promisify = (func: AsyncFunc, data: any) => {
  return new Promise((resolve, reject) => {
    func((error, newData) => {
      if (error) {
        reject(error);
      }
      resolve(newData);
    }, data);
  });
};

const asyncTimes2 = (callback: Callback, num: number) => {
  //async function is giving data and callback function;
  // we have to process given value and call callback with processed value.
  setTimeout(() => callback(undefined, num * 2), 200);
};

//using recursive
function sequence_recursive(funcs: Array<AsyncFunc>) {
  return function (callback: Callback, originalData: number) {
    let currIndex = 0; //which function we have to call

    function callFn(data: any) {
      if (currIndex < funcs.length) {
        //if we are not done iterating yet then

        //call current function
        funcs[currIndex]((err, newData) => {
          if (err) {
            //call original callback with error if error exists
            callback(err, undefined);
          } else {
            // increment function array index
            currIndex++;
            // again call functinon with latest data
            callFn(newData);
          }
          // pass data
        }, data);
      } else {
        // if we are done iterating then call original function with data
        callback(undefined, data);
        return;
      }
    }

    // use original data
    callFn(originalData);
  };
}

function sequence_iterative(funcs: Array<AsyncFunc>) {
  return function (callback: Callback, originalData: any) {
    let promise = Promise.resolve(originalData); //original value as promise
    const finalPromise = funcs.reduce((acc, curr) => {
      //iterate over async functions
      return acc
        .then((data) => {
          //when prev promise resolves use that data and call curr function as Promise
          return Promisify(curr, data);
        })
        .catch((err) => {
          //if error occurs then reject promise
          // we then
          return Promise.reject(err);
        });
    }, promise);

    finalPromise
      .then((data) => {
        return callback(undefined, data);
      })
      .catch((err) => {
        return callback(err, undefined);
      });
  };
}
const asyncTimes4 = sequence_recursive([asyncTimes2, asyncTimes2]);

asyncTimes4((error, data) => {
  console.log(data); // 4
}, 1);
