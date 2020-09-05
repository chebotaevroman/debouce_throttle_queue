debounce = (fn, waitTime) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(args), waitTime);
  };
};

throttle = (fn, waitTime) => {
  let timeout = null;
  let previous = 0;

  const later = (args) => {
    previous = Date.now();
    timeout = null;
    fn(args);
  };

  return (...args) => {
    const now = Date.now();
    const remaining = waitTime - (now - previous);

    if (remaining <= 0 || remaining > waitTime) {
      if (timeout) {
        clearTimeout(timeout);
      }
      later(args);
    } else if (!timeout) {
      timeout = setTimeout(() => later(args), remaining);
    }
  };
};

queue = (fn, waitTime) => {
  const funcQueue = [];
  let isWaiting;

  const executeFunc = (params) => {
    isWaiting = true;
    fn(params);
    setTimeout(next, waitTime);
  };

  const next = () => {
    isWaiting = false;
    if (funcQueue.length) {
      var params = funcQueue.shift();
      executeFunc(params);
    }
  };

  return (...args) => {
    if (isWaiting) {
      funcQueue.push(args);
    } else {
      executeFunc(args);
    }
  };
};
