// src/components/SearchBar/SearchBar.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SearchBar.css";

/**
 * SearchBar
 * - Manages the movie search input
 * - Syncs search query with the URL
 * - Triggers search via callback and updates browser history
 */
function SearchBar({ onSearch }) {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("search") || "";

  const [query, setQuery] = useState(initialQuery);

  // Sync input value when URL query changes (e.g., Home reset)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;

    if (onSearch) onSearch(query);

    navigate(`/?search=${encodeURIComponent(query)}`, { replace: true });
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__input-wrapper">
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-bar__button">
          🔍
        </button>
      </div>
    </form>
  );
}

export default SearchBar;

