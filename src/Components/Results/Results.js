import { useSuggestions } from "../../lib";
import css from "./styles.css";

export const Results = ({ currentSearch }) => {
  const { results, timeTaken } = useSuggestions({ searchTerm: currentSearch });

  return (
    <div className="results-wrapper">
      <div className="meta">
        Showing {results.length} result{results.length > 1 && "s"}. Took{" "}
        {(timeTaken / 100).toFixed(2)}s
      </div>
      {results?.map((entry) => {
        return (
          <div className="shown-result">
            <a href={entry.url} className="title">
              {entry.title}
            </a>
            <p className="description">{entry.description}</p>
          </div>
        );
      })}
    </div>
  );
};
