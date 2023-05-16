import { useState, useEffect } from "react";
import { Suggestions } from "../Suggestions";
import css from "./styles.css";
import { useHistory, OutsideAlerter } from "../../lib";

export const SearchBar = ({ searchByTerm, currentSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [focused, setFocused] = useState(false);

  const { saveEntry, removeEntry, rawHistory } = useHistory(searchTerm);
  const setSearch = (value) => {
    setSearchTerm(value);
  };

  const showSearches = (currentSearch) => {
    saveEntry();
    let input = document.querySelector(".search-input");

    input.blur();
    searchByTerm(currentSearch);
  };

  const handleFocus = (e) => {
    setFocused(true);
  };

  const Input = () => {
    const handleChange = (event) => {
      setSearch(event.target.value);
      if (event.key === "Enter") {
        showSearches(event.target.value || "");
      }
    };

    return (
      <input
        className="search-input"
        onFocus={(e) => handleFocus(e)}
        onKeyDown={(e) => handleChange(e)}
        onChange={(e) => handleChange(e)}
        autoFocus={true}
      />
    );
  };

  const clearSearch = () => {
    let input = document.querySelector(".search-input");
    input.value = "";
    input.focus();
    setSearch(input.value);
  };

  useEffect(() => {
    let input = document.querySelector(".search-input");

    input.focus();
    input.select();
  }, []);

  useEffect(() => {
    let input = document.querySelector(".search-input");
    input.value = currentSearch;
    setSearch(input.value);
    showSearches(currentSearch);
    currentSearch && setFocused(false);
  }, [currentSearch]);

  return (
    <div className="main-wrapper">
      <OutsideAlerter callback={() => setFocused(false)}>
        <div className="search-bar">
          <div
            className="search-icon"
            onClick={() => showSearches(searchTerm)}
          />
          {Input()}
          <div className="delete" onClick={clearSearch} />
        </div>
        {focused && (
          <Suggestions
            searchTerm={searchTerm}
            removeEntry={removeEntry}
            saveEntry={saveEntry}
            history={rawHistory}
            searchByTerm={searchByTerm}
          />
        )}
      </OutsideAlerter>
    </div>
  );
};
