import React from "react";
import "./Bookmark.css";

function Bookmark({ isFavorited, onClick }) {
  return (
    <div
      className={`movie__bookmark ${isFavorited ? "active" : ""}`}
      onClick={onClick}
      title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
    >
      <i className="fa-solid fa-bookmark" />
    </div>
  );
}

export default Bookmark;


