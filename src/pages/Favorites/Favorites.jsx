import React, { useContext, useState, useEffect } from "react";
import { FavoritesContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import SortFilter from "../../components/SortFilter/SortFilter";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import "./Favorites.css";

function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1 second
    setLoading(true);
    const timer = setTimeout(() => {
      setFilteredFavorites([...favorites]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [favorites]);

  const searchParams = new URLSearchParams(location.search);
  const prevSearch = searchParams.get("search") || "";

  const handleBack = () => {
    if (prevSearch) navigate(`/?search=${encodeURIComponent(prevSearch)}`);
    else navigate("/");
  };

  const handleSort = (sortType) => {
    const sorted = [...filteredFavorites];
    if (sortType === "oldest") sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    else if (sortType === "newest") sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    else if (sortType === "rating") sorted.sort(
      (a, b) => parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0)
    );
    setFilteredFavorites(sorted);
  };

  return (
    <div className="favorites__wrapper">
      {/* Back + Sort centered */}
      <div className="favorites__controls">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>
        <SortFilter onSort={handleSort} />
      </div>

      <h2 className="favorites__title">Your Favorites</h2>

      {loading && (
        <div className="loading-state">
          <p>Loading...</p>
        </div>
      )}

      {!loading && filteredFavorites.length === 0 && (
        <div className="favorites__empty">
          <p>You haven't added any favorites yet.</p>
          <p>Click the bookmark icon on a movie to save it here.</p>
        </div>
      )}

      <div className="results__container">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
          : filteredFavorites.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}
      </div>
    </div>
  );
}

export default Favorites;











