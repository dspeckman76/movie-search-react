// src/components/SortFilter/SortFilter.jsx

import React, { useState, useRef, useEffect } from "react";
import "./SortFilter.css";

/**
 * SortFilter
 * - Displays a dropdown menu for sorting movie results
 * - Allows sorting by year (oldest/newest) or IMDb rating
 * - Closes automatically when clicking outside the component
 */
function SortFilter({ onSort }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (type) => {
    onSort(type);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={`sortfilter ${open ? "open" : ""}`}>
      <button
        className="sortfilter__trigger"
        onClick={() => setOpen(!open)}
      >
        Sort By
        <span className="sortfilter__arrow">{open ? "▲" : "▼"}</span>
      </button>

      <div className="sortfilter__content">
        <button onClick={() => handleSelect("oldest")}>
          Oldest to Newest
        </button>
        <button onClick={() => handleSelect("newest")}>
          Newest to Oldest
        </button>
        <button onClick={() => handleSelect("rating")}>
          Rating (Highest First)
        </button>
      </div>
    </div>
  );
}

export default SortFilter;