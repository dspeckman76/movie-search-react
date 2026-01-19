import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    setQuery("");
  };

  // Only show back button if not on Home page
  const showBackButton = location.pathname !== "/";

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      {showBackButton && (
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      )}

      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search your favorite movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">🔍</button>

      </div>
    </form>
  );
}

export default SearchBar;






