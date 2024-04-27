const originalTO = setTimeout; // we will save original setTimeout in originalTO

window.timeouts = [];
window.setTimeout = function (
  callback: TimerHandler,
  delay?: number | undefined,
  ...args: any[]
) {
  // we will override window.setTimeout;
  const timerId = originalTO(callback, delay, ...args); //set original timeout
  window.timeouts.push(timerId); // save time-out id.
  return timerId; //return just like how original time out returns
};
const clearAllTimeouts = () => {
  // clear all saved timeouts.
  window.timeouts.forEach((timerId) => clearTimeout(timerId));
};
