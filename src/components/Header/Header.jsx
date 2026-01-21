// src/components/Header/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logoImg from "../../assets/logo-2.png";

function Header({ onHomeClick }) {
  const navigate = useNavigate();

  const goHome = () => {
    if (onHomeClick) {
      onHomeClick(); // clear search + movies
    }
    navigate("/");
  };

  return (
    <header className="header__row">
      {/* Logo + Title */}
      <div className="logo">
        <img src={logoImg} alt="Logo" className="logo__img" />
        <div className="title">
          <p>
            Movie <span>Search</span>
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <nav className="nav-links">
        <button className="nav__btn" onClick={goHome}>
          Home
        </button>
        <button
          className="nav__btn"
          onClick={() => navigate("/favorites")}
        >
          Favorites
        </button>
      </nav>
    </header>
  );
}

export default Header;








