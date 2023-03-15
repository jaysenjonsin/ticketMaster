//using library debounce instead ->  Not working correctly
export const debounce = (cb: (...args: any[]) => any, delay: number) => {
  let timeout: number;
  return (...args: any[]) => {
    clearTimeout(timeout);
    setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
