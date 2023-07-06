import React from "react";
import { Link } from "react-router-dom";
import "./search.css";

const SearchResult = ({ first_name, last_name }) => {
  const fullName = `${first_name} ${last_name}`;

  return (
    <Link to={`/player-info/${encodeURIComponent(fullName)}`}>
      <div className="search-result">
        {fullName}
      </div>
    </Link>
  );
};

export default SearchResult;
