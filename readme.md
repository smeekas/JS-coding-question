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
