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

function parallel(funcs: AsyncFunc[]) {
  return function (callback: Callback, originalData: any) {
    const fnPromisifiedArr = funcs.map((fnItem) =>
      Promisify(fnItem, originalData)
    );
    Promise.all(fnPromisifiedArr)
      .then((processedData) => {
        callback(undefined, processedData);
      })
      .catch((err) => callback(err, undefined));
  };
}
const all = parallel([async1, async2, async3]);

all((error, data) => {
  console.log(data); // [1, 2, 3]
}, 1);
