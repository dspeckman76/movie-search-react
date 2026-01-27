// src/components/Header/Header.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo-2.png";

/**
 * Header
 * - Displays the site logo and main navigation buttons
 * - Clicking the logo or Home button resets search state and navigates home
 * - Favorites button navigates to the favorites page
 */
function Header({ onReset }) {
  const navigate = useNavigate();

  const goHome = () => {
    if (onReset) {
      onReset(); // reset search state ONLY
    }
    navigate("/"); // ALWAYS navigate
  };

  return (
    <header className="header">
      <div className="header__logo" onClick={goHome} style={{ cursor: "pointer" }}>
        <img src={logo} alt="Logo" className="header__logo-img" />
        <div className="header__title">
          <p>
            Movie <span>Search</span>
          </p>
        </div>
      </div>

      <nav className="header__nav">
        <button className="header__btn" onClick={goHome}>
          Home
        </button>
        <button className="header__btn" onClick={() => navigate("/favorites")}>
          Favorites
        </button>
      </nav>
    </header>
  );
}

export default Header;