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

const async1 = (callback: Callback) => {
  callback(undefined, 1);
};

const async2 = (callback: Callback) => {
  callback(undefined, 2);
};

const async3 = (callback: Callback) => {
  callback(undefined, 3);
};

function parallel_without_promise(funcs: AsyncFunc[]) {
  return function (callback: Callback, originalData: any) {
    const result: any[] = [];  //store all results.
    let isFinished = false; //we need this boolean because if error occurs then we need to return error without calling any other callbacks.
    funcs.forEach((fnItem, index) => {
      fnItem((err, newData) => {
        if (isFinished) return;
        if (err) {
          isFinished = true;
          callback(err, undefined);
          return;
        }
        result[index] = newData;
        if (index === funcs.length - 1) {
          callback(undefined, result);
          return;
        }
      }, originalData);
    });
  };
}

function parallel_with_promise(funcs: AsyncFunc[]) {
  return function (callback: Callback, originalData: any) {

    //promisified Array of all async functions.
    const fnPromisifiedArr = funcs.map((fnItem) =>
      Promisify(fnItem, originalData)
    );
    
    //utilizing in-built Promise.all
    Promise.all(fnPromisifiedArr)
      .then((processedData) => {
        callback(undefined, processedData);
      })
      .catch((err) => callback(err, undefined));
  };
}
const all = parallel_with_promise([async1, async2, async3]);

all((error, data) => {
  console.log(data); // [1, 2, 3]
}, 1);
