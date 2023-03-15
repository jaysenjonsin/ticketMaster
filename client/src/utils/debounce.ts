export const debounce = (fn: Function, ms: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// fn.apply is a method in JavaScript that allows you to call a function with a specific context (the this value) and a set of arguments.

// The apply method takes two arguments:

// The this value to be used as the context of the function call.
// An array or an array-like object containing the arguments to be passed to the function.
