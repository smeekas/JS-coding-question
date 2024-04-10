function race(promiseArray: (Promise<any> | any)[]) {
  const result: any[] = [];
  let isFinished = false;
  if (promiseArray.length === 0) return Promise.resolve([]);
  return new Promise((resolve, reject) => {
    promiseArray.forEach((promiseItem, index) => {
      let newPromise =
        promiseItem instanceof Promise
          ? promiseItem
          : Promise.resolve(promiseItem);
      newPromise
        .then((data) => {
          if (!isFinished) {
            isFinished = true;
            resolve(data);
          }
        })
        .catch((err) => {
          if (!isFinished) {
            isFinished = true;
            reject(err);
          }
        });
    });
  });
}
