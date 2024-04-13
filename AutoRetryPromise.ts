function fetchWithAutoRetry<T extends () => Promise<any>>(
  fetcher: T,
  maximumRetryCount: number
) {
  const originalFetchFn = fetcher;
  maximumRetryCount += 1; // total function call= one main function call + retry count
  return new Promise((resolve, reject) => {
    //fetchFn is function which calls received function
    const fetchFn = () => {
      originalFetchFn()
        .then((data) => {
          return resolve(data);
        })
        .catch((err) => {
          maximumRetryCount--;
          if (maximumRetryCount === 0) {
            reject(err);
          } else {
            fetchFn();
          }
        });
    };
    fetchFn();
  });
}

function fetchWithAutoRetry2<T extends (...args: any[]) => Promise<any>>(
  fetcher: T,
  maximumRetryCount: number
): PromiseLike<Awaited<T>> {
    // slightly simple solution
  return fetcher()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      if (maximumRetryCount === 0) {
        throw err;
      }
      return fetchWithAutoRetry(fetcher, maximumRetryCount - 1);
    });
}
