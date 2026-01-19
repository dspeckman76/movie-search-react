// src/components/SearchBar/SearchBar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    setQuery("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      {/* Back Button */}
      <button
        type="button"
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Search Input + Button */}
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search your favorite movie..."
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




