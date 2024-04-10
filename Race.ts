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
  setTimeout(() => callback(undefined, 1), 300);
};

const async2 = (callback: Callback) => {
  setTimeout(() => callback(undefined, 2), 100);
};

const async3 = (callback: Callback) => {
  setTimeout(() => callback(undefined, 3), 200);
};

function race_with_promise(funcArr: AsyncFunc[]) {
  return function (callback: Callback, originalData: any) {
    const fnPromisified = funcArr.map((fnItem) =>
      Promisify(fnItem, originalData)
    );
    Promise.race(fnPromisified)
      .then((data) => callback(undefined, data))
      .catch((err) => callback(err, undefined));
  };
}
function race_without_promise(funcArr: AsyncFunc[]) {
  return function (callback: Callback, originalData: any) {
    let isFinished = false;
    funcArr.forEach((fnItem) => {
      fnItem((err, data) => {
        if (!isFinished) {
          // If no one is finished yet then...
          isFinished = true; // first mark that promise is been called.
          if (err) {
            callback(err, undefined);
          } else {
            callback(undefined, data);
          }
        }
      }, originalData);
    });
  };
}
const first = race_without_promise([async1, async2, async3]);

first((error, data) => {
  console.log(data); // 2, since 2 is the first to be given
}, 1);
