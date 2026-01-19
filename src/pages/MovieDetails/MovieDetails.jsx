// src/pages/MovieDetails/MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { toast } from "react-toastify";
import "./MovieDetails.css";
import bg1 from "../../assets/bg-1.jpg";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
        );
        const data = await res.json();
        if (data.Response !== "False") {
          setMovie(data);

          const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
          setIsFavorite(favorites.some((fav) => fav.imdbID === data.imdbID));
        }
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p style={{ color: "white" }}>Loading movie details...</p>;

  const handleBack = () => {
    if (location.state?.fromSearch) navigate(-1);
    else navigate("/");
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const updated = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
      toast.info(`Removed "${movie.Title}" from Favorites`, { autoClose: 2000 });
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favorites, movie]));
      setIsFavorite(true);
      toast.success(`Added "${movie.Title}" to Favorites`, { autoClose: 2000 });
    }
  };

  return (
    <div
      className="main__wrapper"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Header />

      <main className="main">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>

        <div className="movie__details">
          <div className="movie__top">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/assets/blank-poster.png"}
              alt={movie.Title}
              className="movie__poster"
            />

            <div className="movie__info-container">
              <h1 className="movie__title">{movie.Title}</h1>
              <p><strong>Year:</strong> {movie.Year}</p>
              <p><strong>Actors:</strong> {movie.Actors}</p>
              <p><strong>Director:</strong> {movie.Director}</p>
              <p><strong>Genre:</strong> {movie.Genre}</p>
              <p><strong>Plot:</strong> {movie.Plot}</p>
              <p><strong>Awards:</strong> {movie.Awards}</p>

              <button
                className={`bookmark-btn ${isFavorite ? "favorited" : ""}`}
                onClick={toggleFavorite}
              >
                {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MovieDetails;



