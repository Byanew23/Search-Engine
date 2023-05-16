import React, { useEffect } from "react";
import { SearchBar, Results } from "./Components";
import { useSearch } from "./lib";
import css from "./styles.css";

function App() {
  const { currentSearch, searchByTerm } = useSearch();

  return (
    <div className="App">
      <SearchBar currentSearch={currentSearch} searchByTerm={searchByTerm} />
      {currentSearch && <Results currentSearch={currentSearch} />}
    </div>
  );
}

export default App;
