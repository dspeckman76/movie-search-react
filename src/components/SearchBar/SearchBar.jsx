// src/components/SearchBar/SearchBar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("search") || "";

  const [query, setQuery] = useState(initialQuery);

  // Sync query when URL changes (e.g., Home reset)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;

    // Trigger search
    if (onSearch) onSearch(query);

    // Update URL
    navigate(`/?search=${encodeURIComponent(query)}`, { replace: true });
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
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
