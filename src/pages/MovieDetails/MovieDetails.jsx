import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BackButton from "../../components/BackButton/BackButton";
import placeholder from "../../assets/blank-poster.png";
import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const OMDB_KEY = process.env.REACT_APP_OMDB_API_KEY;
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${OMDB_KEY}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <p style={{ color: "white", textAlign: "center" }}>Loading…</p>;
  }

  return (
    <>

      <main className="main">
        <BackButton fallback="/" />

        <div className="movie__details">
          <div className="movie__top">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : placeholder}
              alt={movie.Title}
              className="movie__poster"
            />

            <div className="movie__info-container">
              <h1>{movie.Title}</h1>
              <p><strong>Year:</strong> {movie.Year}</p>
              <p><strong>Genre:</strong> {movie.Genre}</p>
              <p><strong>Director:</strong> {movie.Director}</p>
              <p><strong>Actors:</strong> {movie.Actors}</p>
              <p><strong>Plot:</strong> {movie.Plot}</p>
            </div>
          </div>
        </div>
      </main>


    </>
  );
}

export default MovieDetails;




