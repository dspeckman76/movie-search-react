import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton/BackButton";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  return (
    <>


      <main className="main">
        <BackButton fallback="/" />

        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Your Favorites
        </h1>

        <div className="results__container">
          {favorites.length > 0 ? (
            favorites.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              No favorites yet.
            </p>
          )}
        </div>
      </main>

    </>
  );
}

export default Favorites;
