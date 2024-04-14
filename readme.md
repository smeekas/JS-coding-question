# JS coding Questions<br/>

1. [Async helper Sequence()](./Sequence.ts)<br/>
   You are asked to implement an async function helper, `sequence()` which chains up async functions.<br/>
   Your `sequence()` should accept AsyncFunc array, and chain them up by passing new data to the next AsyncFunc through data in Callback.

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
   You are asked to implement an async function helper, `parallel()` which works like `Promise.all()`. Different from `sequence()`, the async function doesn't wait for each other, rather they are all triggered together.

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
   You are asked to implement an async function helper, `race()` which works like `Promise.race()`. Different from `parallel()` that waits for all functions to finish, `race()` will finish when any function is done or run into error.<br/>
   Your `race()` should accept AsyncFunc array, and return a new function which triggers its own callback when any async function is done or an error occurs.

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
   Write function all which should works the same as `Promise.all()`.
5. [Promise.allSettled() polyfill](./Promise.allSettled.ts)<br/>
   Write function allSettled which should works the same as `Promise.allSettled()`.
6. [Promise.race() polyfill](./Promise.race.ts)<br/>
   Write function race which should works the same as `Promise.race()`.
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
    You are asked to create a `fetchWithAutoRetry(fetcher, count)`, which automatically fetch(call function) again when error happens, until the maximum count is met.<br/>
    for simplicity assume fetcher function doesn't accept any argument

11. [get DOM tags](./getDomTags.ts)<br/>
    Given a DOM tree, please return all the tag names it has.<br/>
    Your function should return a unique array of tags names in lowercase, order doesn't matter.
12. [Local Storage With expiration](./LocalStorageWithExpiration.ts)<br/>
    Please create a localStorage wrapper with expiration support.<br/>
    example:-

    ```ts
    myLocalStorage.setItem("token", "value", 1000);
    myLocalStorage.getItem("token"); // 'value'

    //after 1 second
    myLocalStorage.getItem("token"); // null
    ```

13. [Lazy Man](./Lazyman.ts)<br/>
    LazyMan is very lazy, he only eats and sleeps.<br/>
    `LazyMan(name: string, logFn: (log: string) => void)` would output a message, the passed logFn is used.
    ```ts
    LazyMan("Jack", console.log);
    // Hi, I'm Jack.
    ```
    He can eat(food: string)
    ```ts
    LazyMan("Jack", console.log).eat("banana").eat("apple");
    // Hi, I'm Jack.
    // Eat banana.
    // Eat Apple.
    ```
    He also sleep(time: number), time is based on seconds.
    ```ts
    LazyMan("Jack", console.log).eat("banana").sleep(10).eat("apple").sleep(1);
    // Hi, I'm Jack.
    // Eat banana.
    // (after 10 seconds)
    // Wake up after 10 seconds.
    // Eat Apple.
    // (after 1 second)
    // Wake up after 1 second.
    ```
    He can sleepFirst(time: number), which has the highest priority among all tasks, no matter what the order is.
    ```ts
    LazyMan("Jack", console.log)
      .eat("banana")
      .sleepFirst(10)
      .eat("apple")
      .sleep(1);
    // (after 10 seconds)
    // Wake up after 10 seconds.
    // Hi, I'm Jack.
    // Eat banana
    // Eat apple
    // (after 1 second)
    // Wake up after 1 second.
    ```
    Please create such LazyMan()
14. [Function.prototype.call() polyfill](./Function.call.ts)<br/>
15. [Function.prototype.bind() polyfill](./Function.bind.ts)<br/>
