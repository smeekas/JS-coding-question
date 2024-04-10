function all(promiseArray: (Promise<any> | any)[]) {
  const result: any[] = [];

  let isFinished = false;

  if (promiseArray.length === 0) return Promise.resolve([]);

  // Promise.all returns Promise.
  return new Promise((resolve, reject) => {
    promiseArray.forEach((promiseItem, index) => {
      let newPromise =
        promiseItem instanceof Promise
          ? promiseItem
          : Promise.resolve(promiseItem); //Received can also contain non-Promise values

      newPromise
        .then((data: any) => {
          if (isFinished) return;
          result[index] = data;
          if (index === promiseArray.length - 1) {
            resolve(result); //Array finished
          }
        })
        .catch((err: any) => {
          isFinished = true;
          reject(err);
        });
    });
  });
}
