type OnFulFill = (data: unknown) => unknown;
type OnReject = (data: unknown) => void;

type ThenFn = () => void;
type CatchFn = () => void;

enum PromiseState {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}
type TypeOfArrayItem = [MyPromise, OnFulFill?, OnReject?];

type ThenQueue = TypeOfArrayItem[];

const isThenable = (value: unknown): value is MyPromise =>
  !!value &&
  typeof value === "object" &&
  "then" in value &&
  typeof value.then === "function";
class MyPromise {
  private state;
  private thenQueue: ThenQueue;
  private finallyQueue: unknown[];
  private value: unknown;
  constructor(executor?: (resolve: OnFulFill, reject: OnReject) => void) {
    this.state = PromiseState.PENDING;
    this.thenQueue = [];
    this.finallyQueue = [];

    //we want this inside onFulfill to point to current object.
    //as we are passing reference we might loose this. so we are binding the function
    try {
      executor?.(this.onFulfill.bind(this), this.onReject.bind(this));
    } catch (err) {
      this.onReject(err);
    }
  }

  private onFulfill(value: unknown) {
    if (this.state === PromiseState.PENDING) {
      this.state = PromiseState.FULFILLED;
      this.value = value;
      this.propagateFulfilled(); //we have to propagate value to later then calls as value is fulfilled
    }
  }
  private onReject(value: unknown) {
    if (this.state === PromiseState.PENDING) {
      this.state = PromiseState.REJECTED;
      this.value = value;
      this.propagateRejected(); //we have to propagate value to later catch calls as value is rejected
    }
  }
  private propagateFulfilled() {
    /*
      const promise=new Promise();
      const p1=promise.then();
      const p2=promise.then();
      we are iterative over siblings think that way.
     */
    this.thenQueue.forEach(([controlledPromise, fulfilledFn]) => {
      try {
        const valueOrPromise = fulfilledFn?.(this.value);
        //then can return promise or normal value
        if (isThenable(valueOrPromise)) {
          //let's say that then returned promise.
          //so we fulfill returned promise(valueOrPromise) and then we fulfill/reject controlledPromise.
          //this controlledPromise's onFulfill/onReject will change the state of controlled promise to fulfilled/rejected.
          //user can also chain up .thens.catches in controlled promise since we have returned this controlled promise in .then.
          //all later .thens/catches will be handled  by this controlled promise (abstraction)
          valueOrPromise.then(
            (value) => controlledPromise.onFulfill(value),
            (err) => controlledPromise.onReject(err)
          );
        } else {
          //returned value is non-promise so we will fulfill it.
          //this fulfill will change the state of controlled promise to fulfilled.
          //user can also chain up .thens in controlled promise since we have returned this controlled promise in .then.
          //all later thens will be handled  by this controlled promise (abstraction)
          controlledPromise.onFulfill(valueOrPromise);
        }
      } catch (err) {
        controlledPromise.onReject(err);
      }
    });
  }
  private propagateRejected() {
    this.thenQueue.forEach(([controlledPromise, _, rejectFn]) => {
      try {
        if (typeof rejectFn === "function") {
          const valueOrPromise = rejectFn(this.value);
          if (isThenable(valueOrPromise)) {
            // whatever valueOrPromise returns it will be handled by controlledPromise just like in above propagationFulfilled function.
            valueOrPromise.then(
              (value) => controlledPromise.onFulfill(value),
              (err) => controlledPromise.onReject(err)
            );
          } else {
            // this is what catch will return so if it is not promise then it is fulfilled only
            controlledPromise.onFulfill(valueOrPromise);
          }
        } else {
          //we might enter in this else when rejectFn is not provided in then(2nd argument)
          // reject was not present so we will return rejected promise which we hope that next catch will handle.
          controlledPromise.onReject(this.value);
        }
      } catch (err) {
        controlledPromise.onReject(err);
      }
    });
  }

  then(onFulfill?: OnFulFill, onReject?: OnReject) {
    // there might be multiple promises and multiple thens.
    /*
      const promise=new Promise();
      const p1=promise.then();
      const p2=promise.then();
      p1 have no effect on p2.

    */

    const controlledPromise = new MyPromise();

    //then callbacks are pushed to microtask queues
    queueMicrotask(() => {
      const arrayItem: TypeOfArrayItem = [
        controlledPromise,
        onFulfill,
        onReject,
      ];
      this.thenQueue.push(arrayItem);

      /*
      ex. MyPromise.resolve/ MyPromise.reject 
      If promise is settled then we will first 
      go and resolve all callback function of then attached (siblings).
      because promise is settled we are doing this...
      otherwise this is done by onFulfill/onReject method whenever promise settle
    */
      if (this.state === PromiseState.FULFILLED) {
        this.propagateFulfilled();
      } else if (this.state === PromiseState.REJECTED) {
        this.propagateRejected();
      }
    });

    return controlledPromise;
  }
  catch(onReject: OnReject) {
    //catch will also return a promise.
    return this.then(undefined, onReject);
  }

  static resolve(value: unknown) {
    //directly return resolved promise
    return new MyPromise((res) => res(value));
  }
  static reject(err: unknown) {
    //directly return rejected promise
    return new MyPromise((_, rej) => rej(err));
  }
}
