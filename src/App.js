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
  const [movies, setMovies] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (query) => {
    if (!query) return;
    setLoading(true);

    try {
      const OMDB_KEY = process.env.REACT_APP_OMDB_API_KEY;
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${OMDB_KEY}`
      );
      const data = await res.json();

      if (data.Search && data.Search.length > 0) {
        const detailedMovies = await Promise.all(
          data.Search.map(async (m) => {
            try {
              const resDetails = await fetch(
                `https://www.omdbapi.com/?i=${m.imdbID}&apikey=${OMDB_KEY}`
              );
              const details = await resDetails.json();
              return { ...m, imdbRating: details.imdbRating || "0" };
            } catch (err) {
              console.error("Error fetching movie details:", err);
              return { ...m, imdbRating: "0" };
            }
          })
        );

        // Force 1-second minimum loading
        setTimeout(() => {
          setMovies(detailedMovies);
          setSearchPerformed(true);
          setLoading(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setMovies([]);
          setSearchPerformed(true);
          setLoading(false);
        }, 1000);
      }
    } catch (err) {
      console.error("Error fetching OMDb data:", err);
      setTimeout(() => {
        setMovies([]);
        setSearchPerformed(true);
        setLoading(false);
      }, 1000);
    }
  };

  const handleReset = () => {
    setMovies([]);
    setSearchPerformed(false);
  };

  const isFavorite = (imdbID) => favorites.some((movie) => movie.imdbID === imdbID);

  const toggleFavorite = async (movie) => {
    const exists = favorites.some((m) => m.imdbID === movie.imdbID);

    if (exists) {
      toast.info("Removed from Favorites");
      setFavorites((prev) => prev.filter((m) => m.imdbID !== movie.imdbID));
    } else {
      try {
        const OMDB_KEY = process.env.REACT_APP_OMDB_API_KEY;
        const res = await fetch(
          `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${OMDB_KEY}`
        );
        const details = await res.json();

        toast.success("Added to Favorites");
        setFavorites((prev) => [
          ...prev,
          { ...movie, imdbRating: details.imdbRating || "0" },
        ]);
      } catch (err) {
        console.error("Failed to fetch full movie details:", err);
        toast.error("Failed to add to Favorites");
      }
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
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
                    loading={loading}
                  />
                }
              />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites favorites={favorites} />} />
            </Routes>
          </main>

          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
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



