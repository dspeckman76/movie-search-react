// src/App.js
import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

import { ToastProvider } from "./components/Toast/ToastContainer";

import "./App.css";

// Favorites context
export const FavoritesContext = createContext();

function App() {
  const [favorites, setFavorites] = useState([]);

  const isFavorite = (id) => favorites.some((movie) => movie.imdbID === id);

  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      prev.some((m) => m.imdbID === movie.imdbID)
        ? prev.filter((m) => m.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  };

  // Reset state for Home button
  const handleReset = () => {
    localStorage.removeItem("lastSearchQuery");
    window.location.href = "/";
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      <ToastProvider>
        <Router>
          <div className="app__wrapper">
            <Header onReset={handleReset} />
            <main className="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ToastProvider>
    </FavoritesContext.Provider>
  );
}

export default App;
