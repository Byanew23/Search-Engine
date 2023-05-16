import { useState } from "react";
/**
 *
 * @param {string | undefined} searchTerm
 */
export const useHistory = (searchTerm) => {
  const [rawHistory, setRawHistory] = useState([]);

  /**
   *
   * @param {string | undefined} entry
   */
  const saveEntry = (entry) => {
    const current = entry || searchTerm;
    console.log(current, entry, searchTerm);
    if (!current) return;
    if (!rawHistory.includes(current)) {
      setRawHistory([...rawHistory, current]);
    }
  };
  const removeEntry = (term) => {
    const currHistory = rawHistory.filter((el) => el !== term);
    setRawHistory(currHistory);
  };
  const history = rawHistory
    .map((el) => ({ title: el, isHistory: true }))
    .reverse();

  return {
    saveEntry,
    removeEntry,
    history,
    rawHistory,
  };
};
