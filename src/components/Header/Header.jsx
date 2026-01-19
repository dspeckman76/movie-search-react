import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo-2.png"; // your logo

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="site-title">Movie <span className="highlight">Search</span></h1>
      </div>

      <nav className="nav-links">
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/favorites" className="nav-btn">Favorites</Link>
      </nav>
    </header>
  );
}

export default Header;




