// src/pages/MovieDetails/MovieDetails.jsx

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Bookmark from "../../components/Bookmark/Bookmark";
import { resolvePoster } from "../../utils/resolvePoster.js";
import "./MovieDetails.css";

/**
 * MovieDetails page
 * - Displays detailed information for a single movie
 * - Handles fetching from OMDb if movie data is not passed via state
 * - Includes bookmark button and back navigation
 */
function MovieDetails() {
  const navigate = useNavigate(); // Router navigation
  const location = useLocation(); // Current location (for back button)
  const { imdbID } = useParams(); // Movie IMDb ID from URL

  // Movie state: either from location.state or fetched from API
  const [movie, setMovie] = useState(location.state?.movie || null);

  useEffect(() => {
    // If movie data is already passed via state, no need to fetch
    if (movie) return;

    let mounted = true;

    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${imdbID}&plot=full`
        );
        const data = await res.json();

        if (!mounted) return;

        // Resolve poster fallback: TMDb → OMDb → local blank
        const poster = resolvePoster({
          tmdbPoster: data.tmdbPoster,
          Poster: data.Poster && data.Poster !== "N/A" ? data.Poster : null,
        });

        setMovie({ ...data, Poster: poster });
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovie();

    return () => {
      mounted = false;
    };
  }, [imdbID, movie]);

  if (!movie)
    return <p className="movie-details__loading">Movie not found.</p>;

  // Determine the back navigation target
  const fromSearch = location.state?.fromSearch || "/";

  return (
    <div className="movie-details">
      {/* Centered Back Button */}
      <div className="movie-details__back-wrapper">
        <button
          className="movie-details__back-button"
          onClick={() => navigate(fromSearch)}
        >
          ← Back
        </button>
      </div>

      {/* Top Card: poster + info + bookmark */}
      <div className="movie-details__top-card">
        <Bookmark movie={movie} className="movie-details__bookmark" />

        <div className="movie-details__top">
          <div className="movie-details__poster-container">
            <img
              className="movie-details__poster"
              src={movie.Poster}
              alt={movie.Title}
            />
          </div>

          <div className="movie-details__info">
            <h1 className="movie-details__title">{movie.Title}</h1>
            <p>{movie.Year}</p>
            <p>{movie.Genre}</p>
            <p>{movie.Runtime}</p>
            <p>{movie.Director}</p>
            <p>{movie.Actors}</p>
            {movie.imdbRating && (
              <p>
                <strong>IMDb Rating:</strong> {movie.imdbRating}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Card: plot + awards */}
      <div className="movie-details__bottom-card">
        <div>
          <p className="movie-details__plot-title">Plot:</p>
          <p className="movie-details__plot">{movie.Plot}</p>
        </div>

        {movie.Awards && (
          <div>
            <p className="movie-details__plot-title">Awards:</p>
            <p className="movie-details__awards">{movie.Awards}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;