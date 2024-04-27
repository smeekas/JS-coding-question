# JS coding Questions<br/>

1.  [Async helper Sequence()](./Sequence.ts)<br/>
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

2.  [Async helper Parallel()](./Paralllel.ts)<br/>
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

3.  [Async helper Race()](./Race.ts)<br/>
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

4.  [Promise.all() polyfill](./Promise.all.ts)<br/>
    Write function all which should works the same as `Promise.all()`.
5.  [Promise.allSettled() polyfill](./Promise.allSettled.ts)<br/>
    Write function allSettled which should works the same as `Promise.allSettled()`.
6.  [Promise.race() polyfill](./Promise.race.ts)<br/>
    Write function race which should works the same as `Promise.race()`.
7.  [lodash once()](./Once.ts)<br/>
    [\_.once(func)](https://lodash.com/docs/4.17.15#once) is used to force a function to be called only once, later calls only returns the result of first call.
8.  [lodash Chunk()](./Chunk.ts)<br/>
    [\_.chunk(func)](https://lodash.com/docs/4.17.15#chunk) splits array into groups with the specific size.

    ```ts
    chunk([1, 2, 3, 4, 5], 1);
    // [[1], [2], [3], [4], [5]]
    chunk([1, 2, 3, 4, 5], 2);
    // [[1, 2], [3, 4], [5]]

    chunk([1, 2, 3, 4, 5], 3);
    // [[1, 2, 3], [4, 5]]
    ```

9.  [height of dom tree](./HeightOfDom.ts)<br/>
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
16. [lodash cloneDeep()](./CloneDeep.ts)<br/>
    [\_.cloneDeep](https://lodash.com/docs/4.17.15#cloneDeep) could be very useful for creating deep copies.<br/>
    The lodash implementation actually covers a lot of data types, for simplicity, we will just need to cover<br/>
    - primitive types and their wrapper Object
    - Plain Objects (Object literal) with all enumerable properties
    - Array
17. [Convert Html to JSON](./HtmlToJson.ts)<br/>
    Write a function that takes a DOM node as input and converts it to the JavaScript object. The object should have the type of node, its attributes, and all the children.<br/>
    example
    ```ts
    // Input:
    // <div id="foo">
    //   <h1>Hello</h1>
    // </div>
    const node = document.getElementById("foo");
    console.log(HTMLtoJSON(node));
    /*
    Output:
    {
      type: "div",
      props: {
        id: "foo",
      },
      children: [
        {
          type: "h1",
          children: "Hello",
        },
      ],
    }
    */
    ```
18. [lodash Partial()](./Partial.ts)<br/>
    please create your own `partial()`.

    ```ts
    const func = (...args) => args;

    const func123 = partial(func, 1, 2, 3);

    func123(4);
    // [1,2,3,4]
    ```

    It should also support placeholder.<br/>

    ```ts
    const _ = partial.placeholder;
    const func1_3 = partial(func, 1, _, 3);

    func1_3(2, 4);
    // [1,2,3,4]
    ```

19. [Support Negative Indexes to Array](./NegativeIndexArray.ts)
    write a wrapper function to make negative array index possible.

    ```ts
    const originalArr = [1, 2, 3];
    const arr = wrap(originalArr);

    arr[0]; // 1
    arr[1]; // 2
    arr[2]; // 3
    arr[3]; // undefined
    arr[-1]; // 3
    arr[-2]; // 2
    arr[-3]; // 1
    arr[-4]; // undefined
    ```

    All methods on arr should be applied to the original array, which means.

    ```ts
    arr.push(4);
    arr[3]; // 4
    originalArr[3]; // 4
    ```

20. [Throttle Promises](./ThrottlePromise.ts)<br/>
    If you use Promise.all(), and send 100 requests then 100 requests go to your server at the same time, which is a burden to low spec servers.<br/>
    Can we throttle API calls so that always maximum N API calls happens at the same time?<br/>
    example
    ```ts
    //callApis:(()=>Promise)[]
    throttleAsync(callApis, 5)
      .then((data) => {
        // the data is the same as `Promise.all`
      })
      .catch((err) => {
        // any error occurs in the callApis would be relayed here
      });
    ```
21. [Lodash isEqual()](./IsEqual.ts)<br/>
    \_.isEqual is useful when you want to compare complex data types by value not the reference.
    The lodash version covers a lot of data types. In this problem, we will support :

    - primitives
    - plain objects (object literals)
    - array

    Objects are compared by their own, not inherited, enumerable properties.

    ```ts
    const a = { a: "bfe" };
    const b = { a: "bfe" };

    isEqual(a, b); // true
    a === b; // false

    const c = [1, a, "4"];
    const d = [1, b, "4"];

    isEqual(c, d); // true
    c === d; // false

    // circular dependencies
    const a = { name: "dev" };
    a.self = a;
    const b = { name: "dev" };
    b.self = b;

    isEqual(a, b); // true
    a === b; // false
    ```

22. [Immutability Helper](./ImmutabilityHelper.ts)<br/>
    Implement Immutability Helper update(), which supports following features.

    ```ts
    //{$push:Array} push() all the items in array on the target.
    const arr = [1, 2, 3, 4];
    const newArr = update(arr, { $push: [5, 6] });
    // [1, 2, 3, 4, 5, 6]

    //{$set: any} replace the target
    const state = {
      a: {
        b: {
          c: 1,
        },
      },
      d: 2,
    };

    const newState = update(state, { a: { b: { c: { $set: 3 } } } });
    /*
       {
         a: {
           b: {
             c: 3,
           },
         },
         d: 2,
       };
    */
    const arr = [1, 2, 3, 4];
    const newArr = update(arr, { 0: { $set: 0 } });
    //  [0, 2, 3, 4]

    //{$merge: object} merge object to the location
    const state = {
      a: {
        b: {
          c: 1,
        },
      },
      d: 2,
    };

    const newState = update(state, { a: { b: { $merge: { e: 5 } } } });
    /*
    {
      a: {
        b: {
          c: 1,
          e: 5
        }
      },
      d: 2
    }
    */

    //{$apply: function} custom replacer
    const arr = [1, 2, 3, 4];
    const newArr = update(arr, { 0: { $apply: (item) => item * 2 } });
    // [2, 2, 3, 4]
    ```

23. [custom typeof](./DetectType.ts)<br/>
    Write a function to detect data types.<br/>
    Besides basic types, you need to also handle also commonly used complex data type including `Array`, `ArrayBuffer`, `Map`, `Set`, `Date` and `Function`.<br/>
    The type should be lowercase
24. [Resolve Promise within time limit](./PromiseTimeLimit.ts)<br/>
    Given an asynchronous function `fn` and a time t in milliseconds, return a new time limited version of the input function. `fn` takes arguments provided to the time limited function.<br/><br/>
    The time limited function should follow these rules:

    - If the `fn` completes within the time limit of t milliseconds, the time limited function should resolve with the result.

    - If the execution of the `fn` exceeds the time limit, the time limited function should reject with the string "Time Limit Exceeded".
      example

    ```ts
    function myFunction(data: string) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 300);
      });
    }
    let newFunction = timeLimit(myFunction, 500);
    newFunction("will resolve?")
      .then((data) => {
        console.log(data); // will resolve?
      })
      .catch((err) => {
        console.log(err);
      });

    newFunction = timeLimit(myFunction, 200);
    newFunction("will resolve?")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err); //Time limit Exceed
      });
    ```

25. [Memoize](./Memo.ts)<br/>
    Implement a general `memo()` function, which caches the result once called, so when same arguments are passed in, the result will be returned right away.

    ```ts
    const func = (arg1, arg2) => {
      return arg1 + arg2;
    };

    const memoed = memo(func);

    memoed(1, 2);
    // 3, func is called

    memoed(1, 2);
    // 3 is returned right away without calling func

    memoed(1, 3);
    // 4, new arguments, so func is called
    ```

    The arguments are arbitrary, so memo should accept an extra resolver parameter, which is used to generate the cache key, like what [\_.memoize()](https://lodash.com/docs/4.17.15#memoize) does.

    ```ts
    const memoed = memo(func, () => "samekey");

    memoed(1, 2);
    // 3, func is called, 3 is cached with key 'samekey'

    memoed(1, 2);
    // 3, since key is the same, 3 is returned without calling func

    memoed(1, 3);
    // 3, since key is the same, 3 is returned without calling func
    ```

26. [Debounce](./Debounce.ts)<br/>
    `debounce(func, delay)` will returned a `debounced` function, which delays the invoke.<br/>
    Implement such function
27. [Throttle](./Throttle.ts)<br/>
    `throttle(func, delay)` will return a `throttled` function, which will invoke the func at a max frequency no matter how throttled one is called.<br/>
    Basically Throttle will rate limit the original function.<br/>
    When function is in its throttling phase, we might get more function call which we will ignore, but you have to call last function call after throttling finishes.<br/>
    example

    ```ts
    function myFn(arg: number) {
      console.log(arg);
    }

    const throttled = throttle(myFn, 5);
    throttled(1); //1
    throttled(2); //ignored
    throttled(3); //ignored
    throttled(4); //ignored
    // assume now throttling phase is finished.
    // we have to call function with argument 4 because it was the last function call during throttling phase.
    ```

28. [Memoize one](./MemoizeOne.ts)<br/>
    Create `MemoizeOne` function. Unlike `memo` it only remembers the latest arguments and result(and this(context)).<br/>
    Please implement your own `memoizeOne()`, it takes 2 arguments

        - target function
        - (optional) a equality check function to compare current and last arguments

        Default equality check function should be a shallow comparison on array items with strict equal ===.

29. [create a browser history](./BrowserHistory.ts)<br/>
    Please create BrowserHistory class to mimic browser history behavior.<br/>
    The common actions relating to history are:

- new` BrowserHistory()` - when you open a new tab, it is set with an empty history
- `goBack()` - go to last entry, notice the entries are kept so that `forward()` could get us back
- `forward()` - go to next visited entry
- `visit()` - when you enter a new address or click a link, this adds a new entry but truncate the entries which we could forward() to.

  ```ts
  // we start with a new tab
  //[]

  // We visit A, B, C
  //[A, B, C(here)]

  // goBack()
  //[A, B(here), C]

  // goBack()
  //[A(here), B, C]

  // forward()
  //[A, B(here), C]

  //Now if we visit a new url D, since we are currently at B, C is truncated.
  //[A, B, D(here)]
  ```

30. [Lodash get](./Get.ts)<br/>
    [\_.get(object, path, [defaultValue])](https://lodash.com/docs/4.17.15#get) is a handy method to help retrieving data from an arbitrary object. if the resolved value from path is `undefined`, defaultValue is returned.<br/>
    example

    ```ts
    const obj = {
      a: {
        b: {
          c: [1, 2, 3],
        },
      },
    };

    get(obj, "a.b.c"); // [1,2,3]
    get(obj, "a.b.c.0"); // 1
    get(obj, "a.b.c[1]"); // 2
    get(obj, ["a", "b", "c", "2"]); // 3
    get(obj, "a.b.c[3]"); // undefined
    get(obj, "a.c", "dev"); // 'dev'
    ```

31. [Cache API calls](./CacheApiCall.ts)<br/>
    Implement a function in JavaScript that caches the API response for the given amount of time. If a new call is made between that time, the response from the cache will be returned, else a fresh API call will be made.<br/>
    We will use config object if provided. api calls are same if both config object are same.<br/>
    If no config object is provided then api calls are same if api paths are same.<br/>
    example

    ```ts
    /*
      call(path:string,config?:object)
    */
    const call = cachedApiCall(3000);

    call("https://jsonplaceholder.typicode.com/todos/1", {
      keyword: "dev",
    }).then((a) => console.log(a)); //api call

    setTimeout(() => {
      call("https://jsonplaceholder.typicode.com/todos/1", {
        keyword: "dev",
      }).then((a) => console.log(a)); // returned from cache
    }, 2500);

    setTimeout(() => {
      call("https://jsonplaceholder.typicode.com/todos/1", {
        keyword: "dev",
      }).then((a) => console.log(a)); // new api call
    }, 4000);
    ```

32. [getByClassName](./GetByClassName.ts)<br/>
    Write a custom function to find all the elements with the given class in the DOM. Simply put, write the polyfill for the getElementByClassName().<br/>
    example
    ```tsx
    /* INPUT
    <div class="a">
      <div class="b">
        <div class="a">
          <div class="d">d1</div>
        </div>
        <div class="c">
          <div class="a">
            <div class="d">d2</div>
          </div>
        </div>
      </div>
    </div>
    */
    findByClass("d");
    /* OUTPUT
    [
      <div class="d">d1</div>,
      <div class="d">d2</div>
    ]
    */
    ```
33. [getByClassNameHierarchy()](./GetByClassNameHierarchy.ts)<br/>
    Write a function getByClassNameHierarchy() in javaScript that takes a path of class names and returns the last element of that path.<br/>
    example
    ```tsx
    /* INPUT
    <div class="a">
      <div class="b">
        <div class="a">
          <div class="d">d1</div>
        </div>
        <div class="c">
          <div class="a">
            <div class="d">d2</div>
          </div>
        </div>
      </div>
    </div>
    */
    getByClassNameHierarchy("a>b>a");
    /* OUTPUT
    [
      <div class="a">
          <div class="d">d1</div>
      </div>,
      <div class="a">
          <div class="d">d2</div>
      </div>
    ]
    */
    ```
34. [FindAllElementsByColor](./FindAllElementsByColor.ts)<br/>
    Write a function to find all the elements with the given color. Here the color will be provided in any format like, plain text (white), HEXA value (#fff or #ffffff), or RGB value (RGB(255, 255, 255)).
35. [Method chaining](./MethodChaining.ts)<br/>
    Write function `$` to support method chaining like jQuery.<br/>
    example
    ```ts
    $("#button")
      .css("color", "#fff")
      .css("backgroundColor", "#000")
      .css("fontWeight", "bold");
    ```
36. [Generate Selectors](./GenerateSelector.ts)<br/>
    Given a DOM tree and a target element, generate a valid selector to target it.<br/>
    Function should take target element into input and return string of valid selector.<br/>
    You can use id, class, tag-name etc...<br/>
    example
    ```ts
    <div>
      <p>dev</p>
      <div>
        is
        <p>
          <span>
            great. <button>click me!</button>
          </span>
        </p>
      </div>
    </div>
    //Input:- Button Element
    //Output:- body > div > div:nth-child(1) > p > span > button
    ```
37. [Circuit Breaker](./CircuitBreaker.ts)<br/>
    We have to implement a function that will halt the operation for X amount of time if it fails for Y count.

    ```ts
    const breaker = circuitBreaker(myFn, 2, 3000);
    //if myFn fail then retry 2 times. if it still fails then halt operation for 3000ms.
    //after 3000ms only we can again call myFn.

    breaker().then(console.log).catch(console.log); //assume error so we will try 2 times.

    setTimeout(() => {
      breaker().then(console.log).catch(console.log); // It will give time limit error since circuit broke.
    }, 2000);

    setTimeout(() => {
      breaker().then(console.log).catch(console.log); //3000ms passed so we can again call it
    }, 4900);
    ```

38. [Deep Flatten Object](./DeepFlatten.ts)<br/>
    Given an nested object which can have any type of object, deep flatten it and return the new object in Javascript.<br/>
    example
    ```ts
    //Input
    const obj = {
      A: "12",
      B: 23,
      C: {
        P: 23,
        O: {
          L: 56,
        },
        Q: [{ name: null, value: undefined }, 2],
      },
    };
    //Output
    {
      "A": "12",
      "B": 23,
      "C.O.L": 56,
      "C.P": 23,
      "C.Q.0.name": null,
      "C.Q.0.value": undefined,
      "C.Q.1": 2
    }
    ```
39. [clear All Timeouts](./clearAllTimeout.ts)<br/>
  write function `clearAllTimeouts` which will clear All the set timeouts.