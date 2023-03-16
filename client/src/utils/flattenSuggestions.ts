export const flattenSuggestions = (object: any) => {
  const arrays = Object.values(object);
  const suggestions = arrays.flat();
  return suggestions;
};

// export const flattenSuggestions = (results: any) =>
//   Array.isArray(results) ? results : Object.values(results).flat();
