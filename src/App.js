// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Favorites from "./pages/Favorites/Favorites";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  // Lifted state here so it's accessible to all pages
  const [movies, setMovies] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

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
        setSearchPerformed(true);
      } else {
        setMovies([]);
        setSearchPerformed(true);
      }
    } catch (err) {
      console.error("Error fetching OMDb data:", err);
      setMovies([]);
      setSearchPerformed(true);
    }
  };

  return (
    <Router>
      <div className="app__wrapper">
        <Header />

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
            <Route path="/favorites" element={<Favorites />} />
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
  );
}

export default App;













