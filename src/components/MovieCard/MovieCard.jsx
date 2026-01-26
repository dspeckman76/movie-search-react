// src/components/MovieCard/MovieCard.jsx

import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./MovieCard.css";
import Bookmark from "../Bookmark/Bookmark";
import { FavoritesContext } from "../../App";
import { resolvePoster } from "../../utils/resolvePoster.js";

/**
 * MovieCard
 * - Displays a single movie card for search results or favorites
 * - Shows poster, title, year, and bookmark
 * - Handles image load fade-in and skeleton placeholders
 * - Links to MovieDetails page preserving navigation state
 */
function MovieCard({ movie, loading }) {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const { isFavorite } = useContext(FavoritesContext);

  if (loading || !movie) {
    return (
      <div className="movie-card movie-card--skeleton fade-in">
        <div className="movie-card__poster shimmer" />
        <div className="movie-card__title shimmer" />
        <div className="movie-card__year shimmer" />
      </div>
    );
  }

  const poster = resolvePoster(movie);
  const fromSearch = location.pathname + location.search;

  return (
    <div className="movie-card fade-in">
      <Bookmark movie={movie} />
      <Link to={`/movie/${movie.imdbID}`} state={{ movie, fromSearch }}>
        <img
          src={poster}
          alt={movie.Title}
          onLoad={() => setLoaded(true)}
          className="movie-card__poster"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease-in" }}
        />
        <h3 className="movie-card__title">{movie.Title}</h3>
        <p className="movie-card__year">{movie.Year}</p>
      </Link>
    </div>
  );
}

export default MovieCard;

