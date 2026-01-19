// src/components/MovieCard/MovieCard.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./MovieCard.css";
import placeholder from "../../assets/blank-poster.png";

function MovieCard({ movie }) {
  const [posterUrl, setPosterUrl] = useState(placeholder);
  const location = useLocation();

  // Extract current search query from Home page URL
  const searchParams = new URLSearchParams(location.search);
  const currentQuery = searchParams.get("search") || "";

  // Fetch poster from TMDb using IMDb ID
  useEffect(() => {
    const fetchTMDbPoster = async () => {
      try {
        const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const res = await fetch(
          `https://api.themoviedb.org/3/find/${movie.imdbID}?api_key=${TMDB_KEY}&external_source=imdb_id`
        );
        const data = await res.json();
        if (
          data.movie_results &&
          data.movie_results.length > 0 &&
          data.movie_results[0].poster_path
        ) {
          setPosterUrl(
            `https://image.tmdb.org/t/p/w500${data.movie_results[0].poster_path}`
          );
        }
      } catch (err) {
        console.error("Error fetching TMDb poster:", err);
      }
    };

    fetchTMDbPoster();
  }, [movie.imdbID]);

  return (
    <div className="movie__card">
      {/* Include current search query in the link */}
      <Link to={`/movie/${movie.imdbID}?search=${encodeURIComponent(currentQuery)}`}>
        <img src={posterUrl || placeholder} alt={movie.Title} />
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </Link>
    </div>
  );
}

export default MovieCard;





