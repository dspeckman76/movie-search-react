import React from "react";
import "./SkeletonCard.css";

/**
 * SkeletonCard component
 * Props:
 * - type: "movie" | "details" (controls layout)
 * - lines: number of skeleton lines for details
 */
function SkeletonCard({ type = "movie", lines = 3 }) {
  if (type === "movie") {
    return (
      <div className="movie__card skeleton">
        <div className="skeleton__poster shimmer" />
        <div className="skeleton__title shimmer" />
        <div className="skeleton__year shimmer" />
      </div>
    );
  }

  if (type === "details") {
    return (
      <div className="skeleton__top">
        <div className="skeleton__poster shimmer"></div>
        <div className="skeleton__info">
          {Array.from({ length: lines }).map((_, idx) => (
            <div key={idx} className="skeleton__line shimmer"></div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default SkeletonCard;
