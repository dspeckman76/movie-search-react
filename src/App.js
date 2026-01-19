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
  const [movies, setMovies] = useState([]);

  return (
    <Router>
      <div className="app__wrapper">
        <Header setMovies={setMovies} />

        <main className="main">
          <Routes>
            <Route
              path="/"
              element={<Home movies={movies} setMovies={setMovies} />}
            />
            <Route
              path="/movie/:id"
              element={<MovieDetails movies={movies} />}
            />
            <Route
              path="/favorites"
              element={<Favorites movies={movies} />}
            />
          </Routes>
        </main>

        <Footer />

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </Router>
  );
}

export default App;













