export const sortLocalStorage = () => {
  const items = Object.keys(localStorage)
    .map((key) => {
      //put in try catch block because if JSON.parse is not valid JSON, js will throw syntax error. if err thrown, just return false to skip over invalid item
      try {
        return JSON.parse(localStorage.getItem(key)!);
      } catch (error) {
        return null; //just skip over invalid values
      }
    })
    .filter((item) => {
      return item && typeof item === 'object' && item.event;
    })
    //sort items by date added to favorites
    .sort((a, b) => a.timeAdded - b.timeAdded);

  console.log('SORTED: ', items);
  return items.length ? items : null;
};
