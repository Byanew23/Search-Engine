import { useState, useMemo } from "react";

export const useSuggestions = ({ searchTerm = "" }) => {
  const [allResults, setAllResults] = useState([]);
  const [results, setResults] = useState([]);
  const [timeTaken, setTimetaken] = useState(0);

  // GET all data
  useMemo(
    () =>
      fetch(`http://localhost:3001/data`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          setAllResults(res);
          return res;
        }),
    []
  );

  const time1 = performance.now();
  // GET filtered data
  useMemo(
    async () =>
      searchTerm &&
      (await fetch(`http://localhost:3001/search/${searchTerm}`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          setResults(res);
          const time2 = performance.now();
          setTimetaken(time2 - time1);
          return res;
        })),
    [searchTerm]
  );

  return { results: searchTerm ? results : allResults, timeTaken };
};
