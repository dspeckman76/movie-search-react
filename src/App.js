// src/App.js
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Favorites from "./pages/Favorites/Favorites";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

/**
 * 🔹 Favorites Context
 * Used by MovieCard, MovieDetails, Favorites
 */
export const FavoritesContext = createContext();

function App() {
  // Search state
  const [movies, setMovies] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Favorites state (persisted)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  /**
   * 🔹 Persist favorites to localStorage
   */
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  /**
   * 🔹 Search handler (OMDb)
   */
  const handleSearch = async (query) => {
    if (!query) return;

    try {
      const OMDB_KEY = process.env.REACT_APP_OMDB_API_KEY;
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${OMDB_KEY}`
      );
      const data = await res.json();

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }

      setSearchPerformed(true);
    } catch (err) {
      console.error("Error fetching OMDb data:", err);
      setMovies([]);
      setSearchPerformed(true);
    }
  };

  /**
   * 🔹 Used ONLY by Header Home button
   */
  const handleReset = () => {
    setMovies([]);
    setSearchPerformed(false);
  };

  /**
   * 🔹 Favorites helpers
   */
  const isFavorite = (imdbID) => {
    return favorites.some((movie) => movie.imdbID === imdbID);
  };

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.imdbID === movie.imdbID);

      if (exists) {
        toast.info("Removed from Favorites");
        return prev.filter((m) => m.imdbID !== movie.imdbID);
      } else {
        toast.success("Added to Favorites");
        return [...prev, movie];
      }
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      <Router>
        <div className="app__wrapper">
          <Header onHomeClick={handleReset} />

          <main className="main">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    movies={movies}
                    searchPerformed={searchPerformed}
                    onSearch={handleSearch}
                  />
                }
              />

              <Route path="/movie/:id" element={<MovieDetails />} />

              <Route
                path="/favorites"
                element={<Favorites favorites={favorites} />}
              />
            </Routes>
          </main>

          <Footer />

          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </FavoritesContext.Provider>
  );
}

export default App;

