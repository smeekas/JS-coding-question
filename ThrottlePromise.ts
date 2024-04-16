let asyncFactory = function () {
  return fetch(`https://jsonplaceholder.typicode.com/todos/1`)
    .then((response) => response.json())
    .then((json) => json);
};

const arr = [];
for (let i = 0; i < 20; i++) {
  arr.push(asyncFactory);
}

const throttlePromises = (apiCalls: (() => Promise<any>)[], count: number) => {
  const length = apiCalls.length;
  let currentIndex = 0;
  const result: any[] = [];
  return new Promise((resolve, reject) => {
    let pendingPromises = 0;
    const fetchApis = () => {
      let lastIndex = 0;
      if (currentIndex >= length) resolve(result); //if currentIndex exceeds length means we exhausted promise array. so resolve it.
      if (currentIndex + count < length) {
        lastIndex = currentIndex + count;
        // From array of promise we will resolve promises from index currentIndex to lastIndex
      } else {
        //Promises are not in the size of count so we will use end of the array
        lastIndex = length;
      }
      const slicedAPis = apiCalls.slice(currentIndex, lastIndex); //sub array of promise
      pendingPromises = slicedAPis.length; //length of current window
      slicedAPis.forEach((apiCall, index) => {
        apiCall()
          .then((data) => {
            pendingPromises--;
            result[index + currentIndex] = data;

            if (pendingPromises === 0) {
              //if pendingPromises reaches zero means current window is finished resolving promises.
              // we will slide our window
              currentIndex = currentIndex + count;
              fetchApis(); //again calling function to fetch next window of promises
            }
          })
          .catch(reject); //if any error occur we will reject the promise
      });
    };
    fetchApis();
  });
};

const throttled = throttlePromises(arr, 5);

throttled.then((data) => {
  console.log(data);
});
