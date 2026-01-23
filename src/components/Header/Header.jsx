import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logoImg from "../../assets/logo-2.png";

function Header({ onReset }) {
  const navigate = useNavigate();

  const goHome = () => {
    if (onReset) {
      onReset(); // reset search state ONLY
    }
    navigate("/"); // ALWAYS navigate
  };

  return (
    <header className="header__row">
      <div className="logo" onClick={goHome} style={{ cursor: "pointer" }}>
        <img src={logoImg} alt="Logo" className="logo__img" />
        <div className="title">
          <p>
            Movie <span>Search</span>
          </p>
        </div>
      </div>

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
