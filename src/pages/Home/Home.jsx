// src/pages/Home/Home.jsx

import React, { useState, useMemo } from "react";
import { useMovies } from "../../context/MovieContext";
import "./Home.css";

// UI components
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieCard from "../../components/MovieCard/MovieCard";
import SortFilter from "../../components/SortFilter/SortFilter";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";

// Utility for resolving poster fallbacks
import { resolvePoster } from "../../utils/resolvePoster.js";

/**
 * Home page
 * - Provides movie search functionality via SearchBar
 * - Displays sortable movie results
 * - Handles loading and empty states
 */
function Home() {
  /**
   * movies  → array of movie search results from MovieContext
   * loading → global loading flag controlled by MovieContext
   * search  → function that triggers a new OMDb search
   */
  const { movies, loading, search } = useMovies();

  /**
   * sortType controls how movies are sorted in the UI
   * Possible values:
   *  - null (no sorting)
   *  - "oldest"
   *  - "newest"
   *  - "rating"
   */
  const [sortType, setSortType] = useState(null);

  /**
   * Memoized sorted movie list
   *
   * WHY useMemo?
   * - Sorting mutates arrays → we always clone first
   * - Prevents unnecessary re-sorting on every render
   * - Critical: keeps routing/navigation stable after sorting
   *
   * IMPORTANT:
   * - This does NOT modify the original movies array
   * - This avoids breaking MovieCard → MovieDetails navigation
   */
  const sortedMovies = useMemo(() => {
    const list = [...movies];

    if (sortType === "oldest") {
      list.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    }

    if (sortType === "newest") {
      list.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    }

    if (sortType === "rating") {
      list.sort(
        (a, b) =>
          (parseFloat(b.imdbRating) || 0) -
          (parseFloat(a.imdbRating) || 0)
      );
    }

    return list;
  }, [movies, sortType]);

  return (
    <div className="home">
      <SearchBar onSearch={search} />

      {movies.length > 0 && (
        <div className="home__sort">
          <SortFilter onSort={setSortType} />
        </div>
      )}

      <div className="home__grid">
        {loading && movies.length === 0
          ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
          : sortedMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={{
                  ...movie,
                  Poster: resolvePoster(movie),
                }}
              />
            ))}
      </div>
    </div>
  );
}

export default Home;