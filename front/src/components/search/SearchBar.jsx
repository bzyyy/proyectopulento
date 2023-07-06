import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import SearchResult from "./SearchResult";

import "./search.css";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]); // Agrega esta línea para declarar la variable `results` y asignarle un valor inicial vacío

  const axiosData = (value) => {
    axios
      .get(`http://localhost:3000/api/players/${value}`)
      .then((response) => {
        const data = response.data?.data;
        if (Array.isArray(data)) {
          setResults(data); // Guardar los datos completos de los jugadores en el arreglo results
        } else {
          console.log("La respuesta de la API no tiene la estructura esperada");
        }
      })
      .catch((error) => {
        console.log("Error al realizar la solicitud:", error);
        // Manejo del error
      });
  };

  const handleChange = (value) => {
    setInput(value);
    axiosData(value);
  };

  return (
    <div>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="Type a player name..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

        <div className="results-list">
          {results.map((result) => (
            <SearchResult
              key={result.id}
              first_name={result.first_name}
              last_name={result.last_name}
            />
          ))}
      
      </div>
    </div>
  );
};
