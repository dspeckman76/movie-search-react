// src/pages/Home/Home.jsx
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieCard from "../../components/MovieCard/MovieCard";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import SortFilter from "../../components/SortFilter/SortFilter";
import "./Home.css";

function Home({
  movies: initialMovies = [],
  searchPerformed: initialSearch = false,
  setMovies: setParentMovies,
}) {
  const [movies, setMovies] = useState(initialMovies);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(initialSearch);

  const handleSearch = async (query) => {
    setLoading(true);
    setSearchPerformed(true);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();

      if (data.Search) {
        setMovies(data.Search);
        setParentMovies?.(data.Search);
      } else {
        setMovies([]);
        setParentMovies?.([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setMovies([]);
      setParentMovies?.([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (type) => {
    const sorted = [...movies];
    if (type === "rating") {
      sorted.sort((a, b) => parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0));
    } else if (type === "oldest") {
      sorted.sort((a, b) => a.Year.localeCompare(b.Year));
    } else if (type === "newest") {
      sorted.sort((a, b) => b.Year.localeCompare(a.Year));
    }
    setMovies(sorted);
    setParentMovies?.(sorted);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("search");
    if (query && !searchPerformed) handleSearch(query);
  }, []);

  return (
    <div className="home__container">
      <SearchBar onSearch={handleSearch} />
      <SortFilter onSort={handleSort} />

      {loading && <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>}

      <div className={`results__container ${!loading ? "fade-in" : ""}`}>
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <SkeletonCard key={idx} type="movieCard" />
            ))
          : movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}
      </div>

      {!loading && searchPerformed && movies.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No results found.</p>
      )}
    </div>
  );
}

export default Home;
