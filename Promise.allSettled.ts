type ResultOfPromise = {
  status: "fulfilled" | "rejected";
  value?: any;
  reason?: any;
};
function allSettled(promiseArray: (Promise<any> | any)[]) {
  const result: any[] = [];
  if (promiseArray.length === 0) return Promise.resolve([]);
  return new Promise((resolve, reject) => {
    promiseArray.forEach((promiseItem, index) => {
      let newPromise =
        promiseItem instanceof Promise
          ? promiseItem
          : Promise.resolve(promiseItem);
      newPromise
        .then((data) => {
          const resultValue: ResultOfPromise = { status: "fulfilled" };
          resultValue.value = data;
          result[index] = resultValue;
        })
        .catch((err) => {
          const resultValue: ResultOfPromise = { status: "rejected" };
          resultValue.reason = err;
          result[index] = resultValue;
        })
        .finally(() => {
          if (index === promiseArray.length - 1) {
            resolve(result);
          }
        });
    });
  });
}
