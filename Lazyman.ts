type Action =
  | { type: "sleep"; sec: number }
  | { type: "eat"; food: string }
  | { type: "greet"; name: string };

const sleep = (sec: number) => {
  // function should for sleeping
  return new Promise((res) => {
    setTimeout(res, sec * 1000);
  });
};

function LazyMan(name: string, log: (arg0: string) => void) {
  const actions: Action[] = []; // Array which will store all our actions
  actions.push({ type: "greet", name });

  const exec = async () => {
    while (actions.length !== 0) {
      const actionToPerform = actions.shift();
      if (actionToPerform) {
        switch (actionToPerform.type) {
          case "greet":
            log(`Hi, I'm ${actionToPerform.name}.`);
            break;
          case "eat":
            log(`Eat ${actionToPerform.food}.`);
            break;
          case "sleep":
            await sleep(actionToPerform.sec);
            log(
              `Wake up after ${actionToPerform.sec} ${
                actionToPerform.sec === 1 ? "second" : "seconds"
              }.`
            );
            break;
        }
      }
    }
  };

  Promise.resolve().then(() => exec()); //We do not want to start executing until we have all information.
  //By above method we are creating that delay. so we will not start executing until we have all information
  return {
    eat(food: string) {
      actions.push({ type: "eat", food });

      return this;
    },
    sleepFirst(sec: number) {
      actions.unshift({ type: "sleep", sec }); // we have to sleep first so add sleep in front of array

      return this;
    },
    sleep(sec: number) {
      actions.push({ type: "sleep", sec });

      return this;
    },
  };
}
