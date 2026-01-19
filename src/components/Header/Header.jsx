// src/components/Header/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logoImg from "../../assets/logo-2.png"; // replace with your actual logo path

function Header() {
  const navigate = useNavigate();

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
        <button
          className="favorites__btn"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          className="favorites__btn"
          onClick={() => navigate("/favorites")}
        >
          Favorites
        </button>
      </nav>
    </header>
  );
}

export default Header;







