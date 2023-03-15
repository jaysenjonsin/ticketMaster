// export const debounce = (func: (...args: any[]) => void, wait: number) => {
//   let timeout: ReturnType<typeof setTimeout>;
//   return (...args: any[]) => {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// };

// export const debounce = (cb: (...args: any[]) => any, delay: number) => {
//   let timeout: number;
//   return (...args: any[]) => {
//     clearTimeout(timeout);
//     setTimeout(() => {
//       cb(...args);
//     }, delay);
//   };
// };

export const debounce = (cb: (...args: any[]) => any, delay: number) => {
  let timeout: number;
  let lastCallTime = 0; // initialize lastCallTime to 0

  return (...args: any[]) => {
    const currentTime = Date.now();
    const timeSinceLastCall = currentTime - lastCallTime;

    if (timeSinceLastCall >= delay) {
      // check if enough time has passed
      clearTimeout(timeout);
      lastCallTime = currentTime; // update lastCallTime
      setTimeout(() => {
        cb(...args);
      }, delay);
    }
  };
};
