/* eslint-disable */

let formatTime = (lts) => {
  let norm = (i) => {
    if (i > 9) {
      return i;
    } else {
      return "0" + i;
    }
  };
  let __time = new Date(lts);
  return `${norm(__time.getHours())}:${norm(__time.getMinutes())}:${norm(
    __time.getSeconds()
  )} ${norm(__time.getDate())}-${norm(
    __time.getMonth() + 1
  )}-${__time.getFullYear()}`;
};

let formatTimeSplitted = (lts) => {
  let norm = (i) => {
    if (i > 9) {
      return i;
    } else {
      return "0" + i;
    }
  };
  let __time = new Date(lts);

  let __result = {
    time: `${norm(__time.getHours())}:${norm(__time.getMinutes())}:${norm(
      __time.getSeconds()
    )}`,
    date: `${norm(__time.getDate())}-${norm(
      __time.getMonth() + 1
    )}-${__time.getFullYear()}`,
  };

  return __result;
};

export { formatTime, formatTimeSplitted };
