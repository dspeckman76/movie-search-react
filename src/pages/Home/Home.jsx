// src/pages/Home/Home.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

function Home({ movies, searchPerformed, onSearch, onReset }) {
  const location = useLocation();

  /**
   * 🔹 Reset ONLY when navigating via Nav Home button
   * navigate("/", { state: { resetSearch: true } })
   */
  useEffect(() => {
    if (location.state?.resetSearch && onReset) {
      onReset();
    }
  }, [location.state, onReset]);

  return (
    <div className="home__wrapper">
      {/* Center search bar and messages */}
      <div className="home__search-center">
        <SearchBar onSearch={onSearch} />

        {/* Initial load only */}
        {!searchPerformed && (
          <div className="start__exploring">
            <FontAwesomeIcon icon={faFilm} size="6x" />
            <h2>Start Exploring!</h2>
          </div>
        )}

        {/* Search performed but no results */}
        {searchPerformed && movies.length === 0 && (
          <p className="no-results">No movies found. Try searching!</p>
        )}
      </div>

      {/* Movie cards grid */}
      {movies.length > 0 && (
        <div className="results__container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;








