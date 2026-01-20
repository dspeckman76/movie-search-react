import React, { useContext } from "react";
import { FavoritesContext } from "../../App";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Favorites.css";

function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="favorites__wrapper">
      <h2 className="favorites__title">Your Favorites</h2>

      {favorites.length === 0 ? (
        <div className="favorites__empty">
          <p>You haven’t added any favorites yet.</p>
          <p>Click the bookmark icon on a movie to save it here.</p>
        </div>
      ) : (
        <div className="results__container">
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

