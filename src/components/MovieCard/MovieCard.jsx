import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";
import blankPoster from "../../assets/blank-poster.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the movie is already in favorites on mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  // Toggle favorite and show toast
  const toggleFavorite = (e) => {
    e.preventDefault(); // prevent navigation when clicking the bookmark

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const updated = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
      toast.info(`Removed "${movie.title || movie.Title}" from Favorites`, {
        autoClose: 2000,
      });
    } else {
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, movie])
      );
      setIsFavorite(true);
      toast.success(`Added "${movie.title || movie.Title}" to Favorites`, {
        autoClose: 2000,
      });
    }
  };

  // Poster fallback
  const posterUrl =
    movie.poster && movie.poster !== "N/A"
      ? movie.poster
      : movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : blankPoster;

  const title = movie.title || movie.Title || "Untitled";
  const year = movie.year || movie.Year || "N/A";

  return (
    <div className="movie-card-wrapper">
      <Link
        to={`/movie/${movie.imdbID}`}
        state={{ fromSearch: true }}
        className="movie-card-link"
      >
        <div className="movie-card">
          <img src={posterUrl} alt={title} className="movie-poster" />
          <div className="movie-info">
            <h3 className="movie-title">{title}</h3>
            <p className="movie-year">{year}</p>
          </div>
        </div>
      </Link>

      {/* Bookmark icon outside Link to prevent navigation */}
      <FontAwesomeIcon
        icon={faBookmark}
        className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
        onClick={toggleFavorite}
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      />
    </div>
  );
}

export default MovieCard;

