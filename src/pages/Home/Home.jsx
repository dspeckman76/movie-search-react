// src/pages/Home/Home.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import SortFilter from "../../components/SortFilter/SortFilter";
import "./Home.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

function Home({ movies, searchPerformed, onSearch, onReset }) {
  const location = useLocation();
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Sync filteredMovies with movies prop
  useEffect(() => {
    setFilteredMovies([...movies]);
  }, [movies]);

  // Reset search if navigating back from another page
  useEffect(() => {
    if (location.state?.resetSearch && onReset) {
      onReset();
    }
  }, [location.state, onReset]);

  // Sorting logic
  const handleSort = (sortType) => {
    const sorted = [...filteredMovies];
    if (sortType === "oldest") {
      sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    } else if (sortType === "newest") {
      sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    } else if (sortType === "rating") {
      sorted.sort(
        (a, b) =>
          parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0)
      );
    }
    setFilteredMovies(sorted);
  };

  return (
    <div className="home__wrapper">
      <div className="home__search-center">
        <SearchBar onSearch={onSearch} />

        {!searchPerformed && (
          <div className="start__exploring">
            <FontAwesomeIcon icon={faFilm} size="6x" />
            <h2>Start Exploring!</h2>
          </div>
        )}

        {searchPerformed && filteredMovies.length === 0 && (
          <p className="no-results">No movies found. Try searching!</p>
        )}

        {filteredMovies.length > 0 && (
          <div className="home__sort-center">
            <SortFilter onSort={handleSort} />
          </div>
        )}
      </div>

      {filteredMovies.length > 0 && (
        <div className="results__container">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;






