// src/pages/MovieDetails/MovieDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FavoritesContext } from "../../App";
import BackButton from "../../components/BackButton/BackButton";
import Bookmark from "../../components/Bookmark/Bookmark";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import { useToast } from "../../components/Toast/ToastContainer";
import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const { addToast } = useToast();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fromSearch = location.state?.fromSearch || "/";

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      const OMDB_KEY = process.env.REACT_APP_OMDB_API_KEY;

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${OMDB_KEY}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }

      setTimeout(() => setLoading(false), 500);
    };

    fetchMovie();
  }, [id]);

  const handleBookmark = () => {
    if (!movie) return;
    const currentlyFavorited = isFavorite(movie.imdbID);
    toggleFavorite(movie);

    addToast(
      currentlyFavorited ? "Removed from favorites" : "Added to favorites",
      currentlyFavorited ? "info" : "success"
    );
  };

  return (
    <div className="movieDetails__page">
      <div className="movieDetails__back-wrapper">
        <BackButton fallback={fromSearch} className="back-button-favorites" />
      </div>

      {loading ? (
        <>
          <SkeletonCard type="movieDetails" />
          <p className="loading-text">Loading...</p>
        </>
      ) : movie ? (
        <div className="fade-in">
          <div className="movieDetails__top-card">
            <Bookmark movie={movie} className="movieDetails__bookmark" />
            <div className="movie__top">
              <div className="movie__poster-container">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/assets/blank-poster.png"}
                  alt={movie.Title}
                  className="movie__poster"
                />
              </div>
              <div className="movie__info-container">
                <h2 className="movie__title">
                  {movie.Title} <span>({movie.Year})</span>
                </h2>
                <p>Rated: {movie.Rated}</p>
                <p>Genre: {movie.Genre}</p>
                <p>Director: {movie.Director}</p>
                <p>Actors: {movie.Actors}</p>
                <p>IMDB Rating: {movie.imdbRating}</p>
              </div>
            </div>
          </div>

          <div className="movieDetails__bottom-card">
            <h3 className="movie__plot--title">Plot</h3>
            <p className="movie__plot">{movie.Plot}</p>
            {movie.Awards && <p className="movie__awards">Awards: {movie.Awards}</p>}
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          Movie details not found.
        </p>
      )}
    </div>
  );
}

export default MovieDetails;
