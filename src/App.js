import React, { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import Logo from "./logo192.png";

const API_URL = "http://www.omdbapi.com?apikey=42df62af";

const App = () => {
  const [movies, setMovies] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
    console.log(data.Search);
  };

  useEffect(() => {
    searchMovies("Superman");
  }, []);

  return (
    <div className="app">
      <div className="header">
        <img className="logo" src={Logo} alt="logo" width="180px" />
        <h1>MovieLand</h1>
      </div>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (searchTerm || searchTerm.length > 0) {
                searchMovies(searchTerm);
              }
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            if (searchTerm || searchTerm.length > 0) {
              searchMovies(searchTerm);
            }
          }}
        />
      </div>

      {!movies ? (
        <div className="empty">
          <h2>Loading...</h2>
        </div>
      ) : movies.length === 0 ? (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      ) : (
        <div className="container">
          {movies.map((m) => (
            <MovieCard movie={m} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
