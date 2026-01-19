import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import placeholder from "../../assets/blank-poster.png";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const [posterUrl, setPosterUrl] = useState(placeholder);

  useEffect(() => {
    const fetchPosterFromTMDb = async () => {
      try {
        const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;

        const res = await fetch(
          `https://api.themoviedb.org/3/find/${movie.imdbID}?api_key=${TMDB_KEY}&external_source=imdb_id`
        );

        const data = await res.json();

        if (data.movie_results && data.movie_results.length > 0) {
          const posterPath = data.movie_results[0].poster_path;
          if (posterPath) {
            setPosterUrl(`https://image.tmdb.org/t/p/w500${posterPath}`);
          }
        }
      } catch (err) {
        console.error("TMDb poster fetch failed:", err);
      }
    };

    // Prefer OMDb poster if available
    if (movie.Poster && movie.Poster !== "N/A") {
      setPosterUrl(movie.Poster);
    } else {
      fetchPosterFromTMDb();
    }
  }, [movie]);

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      state={{ fromResults: true }}
      className="movie__card"
    >
      <img
        src={posterUrl}
        alt={movie.Title}
        className="movie__poster"
      />

      <div className="movie__info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;





