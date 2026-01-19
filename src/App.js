// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Favorites from "./pages/Favorites/Favorites";
import SearchBar from "./components/SearchBar/SearchBar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app__wrapper">
        {/* Global Header */}
        <Header />

        {/* Global SearchBar */}
        <SearchBar />

        {/* Main content */}
        <main className="main">
          {/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes> */}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global ToastContainer */}
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










