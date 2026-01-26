// src/components/Bookmark/Bookmark.jsx

import React, { useContext } from "react";
import "./Bookmark.css";
import { FavoritesContext } from "../../App";
import { useToast } from "../Toast/ToastContainer";

/**
 * Bookmark
 * - Displays a bookmark icon for a movie
 * - Allows adding/removing the movie from favorites
 * - Uses context to track favorites and toast notifications
 */
function Bookmark({ movie }) {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const { addToast } = useToast();

  const favorited = movie && isFavorite(movie.imdbID);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!movie) return;

    toggleFavorite(movie);

    addToast(
      favorited ? "Removed from favorites" : "Added to favorites",
      favorited ? "info" : "success"
    );
  };

  return (
    <div
      className={`movie-bookmark ${favorited ? "movie-bookmark--active" : ""}`}
      onClick={handleClick}
      title={favorited ? "Remove from Favorites" : "Add to Favorites"}
    >
      <i className="fa-solid fa-bookmark" />
    </div>
  );
}

export default Bookmark;
