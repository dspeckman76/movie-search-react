// src/components/SearchBar/SearchBar.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SearchBar.css";

function SearchBar({ onSearch, backTarget }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    setQuery("");
  };

  // Show back button if not on Home
  const showBackButton = location.pathname !== "/";

  const handleBack = () => {
    if (backTarget) {
      navigate(backTarget); // go to specified route
    } else {
      navigate(-1); // default browser history back
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      {showBackButton && (
        <button
          type="button"
          className="back-btn"
          onClick={handleBack}
        >
          ← Back
        </button>
      )}

      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          🔍
        </button>
      </div>
    </form>
  );
}

export default SearchBar;







