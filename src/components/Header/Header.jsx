import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ setMovies }) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    if (setMovies) setMovies([]); // clear search results
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="site-title">
          Movie <span className="highlight">Search</span>
        </h1>
      </div>

      <nav className="nav-links">
        <button className="nav-btn" onClick={handleHomeClick}>
          Home
        </button>

        <button
          className="nav-btn"
          onClick={() => navigate("/favorites")}
        >
          Favorites
        </button>
      </nav>
    </header>
  );
}

export default Header;





