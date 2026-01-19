// src/pages/Home/Home.jsx
import React, { useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (query) => {
    if (!query) return;

    try {
      const OMDB_KEY = process.env.REACT_APP_OMDB_API_KEY;
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${OMDB_KEY}`
      );
      const data = await res.json();

      if (data.Search) setMovies(data.Search);
      else setMovies([]);
    } catch (err) {
      console.error("Error fetching OMDb data:", err);
      setMovies([]);
    }
  };

  return (
    <div className="home__wrapper">
      {/* Center search bar and "no results" message */}
      <div className="home__search-center">
        <SearchBar onSearch={handleSearch} />

        {movies.length === 0 && (
          <p className="no-results">No movies found. Try searching!</p>
        )}
      </div>

      {/* Movie cards */}
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





