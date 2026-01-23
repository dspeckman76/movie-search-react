// src/components/Bookmark/Bookmark.jsx
import React, { useContext } from "react";
import "./Bookmark.css";
import { FavoritesContext } from "../../App";
import { useToast } from "../Toast/ToastContainer";

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
      className={`movie__bookmark ${favorited ? "active" : ""}`}
      onClick={handleClick}
      title={favorited ? "Remove from Favorites" : "Add to Favorites"}
    >
      <i className="fa-solid fa-bookmark" />
    </div>
  );
}

export default Bookmark;
