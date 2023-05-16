import { useState } from "react";

export const useSearch = () => {
  const [currentSearch, setCurrentSearch] = useState("");

  const searchByTerm = (searchTerm) => {
    setCurrentSearch(searchTerm);
  };

  const removeSearch = () => {
    setCurrentSearch("");
  };

  return { searchByTerm, removeSearch, currentSearch };
};
