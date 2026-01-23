// src/components/SkeletonCard/SkeletonCard.jsx
import React from "react";
import "./SkeletonCard.css";

function SkeletonCard({ type = "movieCard" }) {
  return (
    <div className={`skeleton ${type}`}>
      <div className="skeleton__poster shimmer" />
      {type === "movieCard" && (
        <>
          <div className="skeleton__title shimmer" />
          <div className="skeleton__year shimmer" />
        </>
      )}
      {type === "movieDetails" && (
        <>
          <div className="skeleton__info shimmer" />
          <div className="skeleton__info shimmer" />
          <div className="skeleton__info shimmer" />
        </>
      )}
    </div>
  );
}

export default SkeletonCard;
