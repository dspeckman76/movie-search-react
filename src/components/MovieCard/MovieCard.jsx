// src/components/MovieCard/MovieCard.jsx
import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./MovieCard.css";
import placeholder from "../../assets/blank-poster.png";
import Bookmark from "../Bookmark/Bookmark";
import { FavoritesContext } from "../../App";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

function MovieCard({ movie, loading }) {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const { isFavorite } = useContext(FavoritesContext);

  if (loading || !movie) return <SkeletonCard type="movieCard" />;

  const searchParams = new URLSearchParams(location.search);
  const currentQuery = searchParams.get("search") || "";
  const fromSearch = location.pathname + location.search;

  const poster = movie.Poster !== "N/A" ? movie.Poster : placeholder;

  return (
    <div className="movie__card fade-in">
      <Bookmark movie={movie} />
      <Link
        to={`/movie/${movie.imdbID}?search=${encodeURIComponent(currentQuery)}`}
        state={{ fromSearch }}
      >
        <img
          src={poster}
          alt={movie.Title}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease-in" }}
        />
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </Link>
    </div>
  );
}

export default MovieCard;
