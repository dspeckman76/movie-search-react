// src/components/SkeletonCard/SkeletonCard.jsx

import React from "react";
import "./SkeletonCard.css";

/**
 * SkeletonCard
 * - Displays loading placeholders while movie data is being fetched
 * - Supports two layouts:
 *   1) Movie card skeleton (grid view)
 *   2) Movie details skeleton (details page)
 */
function SkeletonCard({ type }) {
  if (type === "movieDetails") {
    return (
      <div className="movie-details-skeleton">
        <div className="movie-details-skeleton__back">
          <div className="skeleton skeleton--back shimmer" />
        </div>

        <div className="movie-details-skeleton__top">
          <div className="movie-details-skeleton__poster">
            <div className="skeleton skeleton--poster shimmer" />
          </div>

          <div className="movie-details-skeleton__info">
            <div className="skeleton skeleton--title shimmer" />
            <div className="skeleton skeleton--text shimmer" />
            <div className="skeleton skeleton--text shimmer" />
            <div className="skeleton skeleton--text shimmer" />
            <div className="skeleton skeleton--text shimmer" />
          </div>
        </div>

        <div className="movie-details-skeleton__bottom">
          <div className="skeleton skeleton--plot shimmer" />
        </div>
      </div>
    );
  }

  // Default: movie card skeleton (grid)
  return (
    <div className="movie-card-skeleton fade-in">
      <div className="skeleton skeleton--poster shimmer" />
      <div className="skeleton skeleton--title shimmer" />
      <div className="skeleton skeleton--year shimmer" />
    </div>
  );
}

export default SkeletonCard;