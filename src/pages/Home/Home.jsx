import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import SortFilter from "../../components/SortFilter/SortFilter";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import "./Home.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faSpinner } from "@fortawesome/free-solid-svg-icons";

function Home({ movies, searchPerformed, onSearch, loading }) {
  const location = useLocation();
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    setFilteredMovies([...movies]);
  }, [movies]);

  useEffect(() => {
    if (location.state?.resetSearch) setFilteredMovies([]);
  }, [location.state]);

  const handleSort = (sortType) => {
    const sorted = [...filteredMovies];
    if (sortType === "oldest") sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    else if (sortType === "newest") sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    else if (sortType === "rating") sorted.sort(
      (a, b) => parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0)
    );
    setFilteredMovies(sorted);
  };

  return (
    <div className="home__wrapper">
      <div className="home__search-center">
        <SearchBar onSearch={onSearch} />

        {!loading && !searchPerformed && (
          <div className="start__exploring">
            <FontAwesomeIcon icon={faFilm} size="6x" />
            <h2>Start Exploring!</h2>
          </div>
        )}

        {loading && (
          <div className="loading-state">
            <FontAwesomeIcon icon={faSpinner} spin size="2x" />
            <p>Loading...</p>
          </div>
        )}

        {!loading && searchPerformed && filteredMovies.length === 0 && (
          <p className="no-results">No movies found. Try searching!</p>
        )}

        {!loading && filteredMovies.length > 0 && (
          <div className="home__sort-center">
            <SortFilter onSort={handleSort} />
          </div>
        )}
      </div>

      <div className="results__container">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
          : filteredMovies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}
      </div>
    </div>
  );
}

export default Home;












