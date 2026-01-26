// src/context/MovieContext.jsx

import React, { createContext, useContext, useState } from "react";
import { searchMoviesWithPosters } from "../services/api";

/**
 * MovieContext
 * Provides global state for movies, loading, query, and favorites.
 */
const MovieContext = createContext();

/**
 * MovieProvider
 * Wraps the app and provides:
 * - movies → current search results
 * - loading → global loading flag
 * - query → current search term
 * - favorites → locally stored favorite movies
 * Functions:
 * - search → perform OMDb search
 * - resetHome → clear search results
 * - toggleFavorite → add/remove favorites
 */
function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  /**
   * search
   * Performs a movie search using the provided query.
   * Updates movies state with results including poster URLs.
   */
  const search = async (q) => {
    if (!q) return;
    setLoading(true);
    setQuery(q);

    const results = await searchMoviesWithPosters(q);
    setMovies(results);
    setLoading(false);
  };

  /**
   * resetHome
   * Clears the movies and search query, resets loading state.
   */
  const resetHome = () => {
    setMovies([]);
    setQuery("");
    setLoading(false);
  };

  /**
   * toggleFavorite
   * Adds or removes a movie from favorites and updates localStorage.
   */
  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const next = prev.some((m) => m.imdbID === movie.imdbID)
        ? prev.filter((m) => m.imdbID !== movie.imdbID)
        : [...prev, movie];

      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        query,
        favorites,
        search,
        resetHome,
        toggleFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

/**
 * useMovies
 * Custom hook to access MovieContext state and functions.
 */
const useMovies = () => useContext(MovieContext);

/**
 * Named exports
 */
export { MovieProvider, useMovies };
