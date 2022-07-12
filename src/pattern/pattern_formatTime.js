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

export { formatTime };
