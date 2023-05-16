export const getResults = () => {
  // GET all data
  return fetch("http://localhost:3001/data")
    .then((response) => response.json())
    .then((res) => {
      return res;
      // Do something with the data
    });
};
