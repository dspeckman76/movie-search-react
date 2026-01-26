// src/pages/Favorites/Favorites.jsx

import React from "react";
import { useMovies } from "../../context/MovieContext";
import "./Favorites.css";

// UI components
import MovieCard from "../../components/MovieCard/MovieCard";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";

// Utility for resolving poster fallbacks
import { resolvePoster } from "../../utils/resolvePoster.js";

/**
 * Favorites page
 * - Displays a grid of favorited movies from MovieContext
 * - Shows loading skeletons when data is loading and favorites are empty
 * - Shows an empty-state message when no favorites exist
 */
function Favorites() {
  /**
   * favorites → array of favorited movies stored in MovieContext
   * loading   → global loading flag shared across the app
   */
  const { favorites, loading } = useMovies();

  return (
    <div className="favorites">
      <div className="favorites__grid">
        {loading && favorites.length === 0 ? (
          [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
        ) : favorites.length === 0 ? (
          <p className="favorites__message">No favorites added yet.</p>
        ) : (
          favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={{
                ...movie,
                Poster: resolvePoster(movie),
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;