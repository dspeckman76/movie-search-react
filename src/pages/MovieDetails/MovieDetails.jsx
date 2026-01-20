import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./MovieDetails.css";
import placeholder from "../../assets/blank-poster.png";
import Bookmark from "../../components/Bookmark/Bookmark";
import { FavoritesContext } from "../../App";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  const [movie, setMovie] = useState(null);
  const [posterUrl, setPosterUrl] = useState(placeholder);

  // Extract previous search query
  const searchParams = new URLSearchParams(location.search);
  const prevSearch = searchParams.get("search") || "";

  // Fetch movie details (OMDb)
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const OMDB_KEY = process.env.REACT_APP_OMDB_API_KEY;
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${OMDB_KEY}`
        );
        const data = await res.json();
        if (data) setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Fetch poster (TMDb)
  useEffect(() => {
    const fetchTMDbPoster = async () => {
      try {
        const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const res = await fetch(
          `https://api.themoviedb.org/3/find/${id}?api_key=${TMDB_KEY}&external_source=imdb_id`
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
  }, [id]);

  // Back button logic
  const handleBack = () => {
    if (prevSearch) {
      navigate(`/?search=${encodeURIComponent(prevSearch)}`);
    } else {
      navigate("/");
    }
  };

  if (!movie) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>
    );
  }

  return (
    <div className="movie__details">
      {/* Back Button */}
      <div className="movie__header-top">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>
      </div>

      {/* Top Section */}
      <div className="movie__top">
      <Bookmark
        isFavorited={isFavorite(movie.imdbID)}
        onClick={() => toggleFavorite(movie)}
      />

        <div className="movie__poster-container">
          <img
            className="movie__poster"
            src={posterUrl || placeholder}
            alt={movie.Title}
          />
        </div>

        <div className="movie__info-container">
          <div className="movie__title-row">
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
          </div>

          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
          <p><strong>Awards:</strong> {movie.Awards}</p>
        </div>
      </div>

      {/* Plot */}
      <div className="movie__bottom">
        <h3 className="movie__plot--title">Plot</h3>
        <p className="movie__plot">{movie.Plot}</p>
      </div>
    </div>
  );
}

export default MovieDetails;







