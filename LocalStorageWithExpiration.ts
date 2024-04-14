const getTimeKey = (key: string) => {
  return `${key}_time`;
};

const myLocalStorage = {
  setItem: (key: string, value: any, time?: number) => {
    localStorage.setItem(key, value);
    if (time !== undefined) {
      //save expiration time
      const curr = Date.now() + time;
      localStorage.setItem(getTimeKey(key), curr.toString());
    } else {
      localStorage.setItem(getTimeKey(key), "NO_TIME");
    }
  },

  getItem: (key: string) => {
    const timekey = getTimeKey(key);
    const timeInMs = localStorage.getItem(timekey);
    if (timeInMs) {
      //if time is present then...

      const curr = Date.now();
      if (timeInMs === "NO_TIME") {
        return localStorage.getItem(key);
      }
      if (+timeInMs > curr) {
        //if time is not expired yet then return the value.
        return localStorage.getItem(key);
      } else {
        //if time is expired then remove values and return null
        localStorage.removeItem(key);
        localStorage.removeItem(timekey);
      }
    }
    return null;
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
    localStorage.removeItem(getTimeKey(key));
  },
  clear() {
    localStorage.clear();
  },
};
