export const sliceToClosestSpace = async (
  string: string,
  characterLimit: number = 90
) => string.slice(0, string.indexOf(' ', characterLimit) || characterLimit);

// example use case:
const str = 'The quick brown fox jumps over the lazy dog';
const index = str.indexOf(' ', 90); // find the index of the next space after position 90
const slicedStr = str.slice(0, index); // slice the string up to that index
