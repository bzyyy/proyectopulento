import React from "react";
import { useState } from "react";
import { SearchBar } from "../search/SearchBar";
import "../search/search.css";


export default function Players() {
  const [results, setResults] = useState([]);
  
  return (
    <section className="search">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          {results && results.length > 0}
        </div> 
    </section>
  );
}