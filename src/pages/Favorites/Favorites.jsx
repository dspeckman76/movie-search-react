// src/pages/Favorites/Favorites.jsx
import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import BackButton from "../../components/BackButton/BackButton";
import { FavoritesContext } from "../../App";
import "./Favorites.css";

function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  const location = useLocation();
  const fromSearch = location.state?.fromSearch || "/";

  const [loading, setLoading] = useState(true);

  // Match Home shimmer timing
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [favorites]);

  return (
    <div className="favorites__container">
      {/* Centered Back Button */}
      <div className="favorites__toolbar">
        <BackButton fallback={fromSearch} className="back-button-favorites" />
      </div>

      {/* Centered grid — SAME as Home */}
      <div className={`results__container ${!loading ? "fade-in" : ""}`}>
        {loading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} type="movieCard" />
          ))
        ) : favorites.length === 0 ? (
          <p className="favorites__empty">No favorites yet.</p>
        ) : (
          favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
