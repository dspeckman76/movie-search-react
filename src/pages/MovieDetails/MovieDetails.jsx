// src/pages/MovieDetails/MovieDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FavoritesContext } from "../../App";
import BackButton from "../../components/BackButton/BackButton";
import Bookmark from "../../components/Bookmark/Bookmark";
import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const prevSearch = searchParams.get("search") || "";

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
        console.error("Error fetching movie details:", err);
      }

      // Simulate 1-second loading
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchMovie();
  }, [id]);

  // Skeleton lines helper
  const renderSkeletonLines = (num = 4) => {
    return Array.from({ length: num }).map((_, idx) => (
      <div key={idx} className="skeleton__line shimmer"></div>
    ));
  };

  return (
    <div className="movie__details">
      <div className="movie__header-top">
        <BackButton fallback="/" />
      </div>

      {loading ? (
        <>
          <div className="loading-state">Loading...</div>

          <div className="skeleton__top">
            <div className="skeleton__poster shimmer"></div>
            <div className="skeleton__info">{renderSkeletonLines(6)}</div>
          </div>
        </>
      ) : movie ? (
        <>
          <div className="movie__top">
            <div className="movie__poster-container">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/assets/blank-poster.png"}
                alt={movie.Title}
                className="movie__poster"
              />
            </div>

            <div className="movie__info-container">
              <div className="movie__title-row">
                <h2>{movie.Title} ({movie.Year})</h2>
                <Bookmark
                  isFavorited={isFavorite(movie.imdbID)}
                  onClick={() => toggleFavorite(movie)}
                />
              </div>

              <p>Rated: {movie.Rated}</p>
              <p>Genre: {movie.Genre}</p>
              <p>Director: {movie.Director}</p>
              <p>Actors: {movie.Actors}</p>
              <p>IMDB Rating: {movie.imdbRating}</p>
            </div>
          </div>

          <div className="movie__bottom">
            <h3 className="movie__plot--title">Plot</h3>
            <p className="movie__plot">{movie.Plot}</p>
            {movie.Awards && <p className="movie__awards">Awards: {movie.Awards}</p>}
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          Movie details not found.
        </p>
      )}
    </div>
  );
}

export default MovieDetails;








