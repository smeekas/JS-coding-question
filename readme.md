# JS coding Questions<br/>

1. [Async helper Sequence()](./Sequence.ts)<br/>
   You are asked to implement an async function helper, sequence() which chains up async functions.<br/>
   Your sequence() should accept AsyncFunc array, and chain them up by passing new data to the next AsyncFunc through data in Callback.

   ```ts
   //All async functions have following interface
   type Callback = (error: Error, data: any) => void;

   type AsyncFunc = (callback: Callback, data: any) => void;
   ```

   Once an error occurs, it should trigger the last callback without triggering the uncalled functions.<br/>
   ex.

   ```ts
   const asyncTimes2 = (callback, num) => {
     setTimeout(() => callback(null, num * 2), 100);
   };

   const asyncTimes4 = sequence([asyncTimes2, asyncTimes2]);

   asyncTimes4((error, data) => {
     console.log(data); // 4
   }, 1);
   ```

2. [Async helper Parallel()](./Paralllel.ts)<br/>
   You are asked to implement an async function helper, parallel() which works like Promise.all(). Different from sequence(), the async function doesn't wait for each other, rather they are all triggered together.

   ```ts
   //All async functions have following interface
   type Callback = (error: Error, data: any) => void;

   type AsyncFunc = (callback: Callback, data: any) => void;
   ```

   When error occurs, only first error is returned. Later errors or data are ignored.<br/>
   ex.

   ```ts
   const async1 = (callback) => {
     callback(undefined, 1);
   };

   const async2 = (callback) => {
     callback(undefined, 2);
   };

   const async3 = (callback) => {
     callback(undefined, 3);
   };

   const all = parallel([async1, async2, async3]);

   all((error, data) => {
     console.log(data); // [1, 2, 3]
   }, 1);
   ```

3. [Async helper Race()](./Race.ts)<br/>
   You are asked to implement an async function helper, race() which works like Promise.race(). Different from parallel() that waits for all functions to finish, race() will finish when any function is done or run into error.<br/>
   Your race() should accept AsyncFunc array, and return a new function which triggers its own callback when any async function is done or an error occurs.

   ```ts
   //All async functions have following interface
   type Callback = (error: Error, data: any) => void;

   type AsyncFunc = (callback: Callback, data: any) => void;
   ```

   When error occurs, only first error is passed down to the last. Later errors or data are ignored.<br/>
   ex.

   ```ts
   const async1 = (callback) => {
     setTimeout(() => callback(undefined, 1), 300);
   };

   const async2 = (callback) => {
     setTimeout(() => callback(undefined, 2), 100);
   };

   const async3 = (callback) => {
     setTimeout(() => callback(undefined, 3), 200);
   };
   const first = race([async1, async2, async3]);

   first((error, data) => {
     console.log(data); // 2, since 2 is the first to be given
   }, 1);
   ```

4. [Promise.all() polyfill](./Promise.all.ts)<br/>
   Write function all which should works the same as Promise.all()
5. [Promise.allSettled() polyfill](./Promise.allSettled.ts)<br/>
   Write function allSettled which should works the same as Promise.allSettled()
6. [Promise.race() polyfill](./Promise.race.ts)<br/>
   Write function race which should works the same as Promise.race()
7. [lodash once()](./Once.ts)<br/>
   [\_.once(func)](https://lodash.com/docs/4.17.15#once) is used to force a function to be called only once, later calls only returns the result of first call.
8. [lodash Chunk()](./Chunk.ts)<br/>
   [\_.chunk(func)](https://lodash.com/docs/4.17.15#chunk) splits array into groups with the specific size.

   ```ts
   chunk([1, 2, 3, 4, 5], 1);
   // [[1], [2], [3], [4], [5]]
   chunk([1, 2, 3, 4, 5], 2);
   // [[1, 2], [3, 4], [5]]

   chunk([1, 2, 3, 4, 5], 3);
   // [[1, 2, 3], [4, 5]]
   ```

9. [height of dom tree](./HeightOfDom.ts)<br/>
   If given DOM tree, can you create a function to get the height of it?<br/>
   For the DOM tree below, we have a height of 4.

   ```html
   <div>
     <div>
       <p>
         <button>Hello</button>
       </p>
     </div>
     <p>
       <span>World!</span>
     </p>
   </div>
   ```

10. [auto-retry Promise on rejection](./AutoRetryPromise.ts)<br/>
    You are asked to create a fetchWithAutoRetry(fetcher, count), which automatically fetch(call function) again when error happens, until the maximum count is met.<br/>
    for simplicity assume fetcher function doesn't accept any argument
