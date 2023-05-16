import { useSuggestions } from "../../lib";
import css from "./styles.css";

export const Suggestions = ({
  searchTerm = "",
  removeEntry,
  history,
  searchByTerm,
  saveEntry,
}) => {
  const { results: rawResults } = useSuggestions({ searchTerm });

  const parsedHistory = history
    .filter((el) => el.toLowerCase().startsWith(searchTerm.toLowerCase() || ""))
    .map((el) => ({ title: el, isHistory: true }))
    .reverse();

  const results = [
    ...parsedHistory,
    ...rawResults.filter((el) => !history.includes(el.title)),
  ];
  const updateHistory = (name) => {
    removeEntry(name);
  };

  const handleClick = (title) => {
    saveEntry(title);
    searchByTerm(title);
  };

  return (
    <div className="wrapper">
      <div className="divider" />
      {results?.slice(0, 10)?.map((entry, index) => (
        <span key={`${entry.title}__${index}`}>
          {entry.isHistory ? (
            <div className="resWrapper">
              <div
                className="history icon"
                onClick={() => handleClick(entry.title)}
              />
              <p
                className="historyText result"
                onClick={() => handleClick(entry.title)}>
                {entry.title}
              </p>
              <div
                className="delete"
                onClick={(e) => {
                  e.preventDefault();
                  updateHistory(entry.title);
                }}
              />
            </div>
          ) : (
            <div
              className="resWrapper"
              onClick={() => handleClick(entry.title)}>
              <div className="suggest icon" />
              <p className="result">{entry.title}</p>
            </div>
          )}
        </span>
      ))}
    </div>
  );
};
