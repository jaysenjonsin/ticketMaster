export const flattenSuggestions = (object: any) => {
  const arrays = Object.values(object);
  const suggestions = arrays.flat();
  return suggestions;
};
