// src/App.js

import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { MovieProvider, useMovies } from "./context/MovieContext";
import { ToastProvider } from "./components/Toast/ToastContainer";
import "./App.css";

/**
 * FavoritesContext
 * Provides favorite movies state and helper functions to components like Bookmark.
 */
export const FavoritesContext = createContext();

/**
 * AppContent
 * Handles routing and provides FavoritesContext based on MovieContext state.
 */
function AppContent() {
  const { favorites, toggleFavorite, resetHome } = useMovies();

  // Helper to check if a movie is favorited
  const isFavorite = (imdbID) => favorites.some((m) => m.imdbID === imdbID);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      <div className="app__wrapper">
        <Header onReset={resetHome} />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:imdbID" element={<MovieDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </FavoritesContext.Provider>
  );
}

/**
 * App
 * Wraps the entire application with MovieProvider, ToastProvider, and Router.
 */
function App() {
  return (
    <MovieProvider>
      <ToastProvider>
        <Router>
          <AppContent />
        </Router>
      </ToastProvider>
    </MovieProvider>
  );
}
export default App;
