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

export const debounce = (cb: (...args: any[]) => any, delay: number) => {
  let timeout: number;
  return (...args: any[]) => {
    clearTimeout(timeout);
    setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

// fn.apply is a method in JavaScript that allows you to call a function with a specific context (the this value) and a set of arguments.

// The apply method takes two arguments:

// The this value to be used as the context of the function call.
// An array or an array-like object containing the arguments to be passed to the function.
