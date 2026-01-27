// src/utils/resolvePoster.js

import placeholder from "../assets/blank-poster.png";

/**
 * Resolves the correct poster URL for a movie.
 * Priority: TMDb poster > OMDb poster > local blank-poster
 * @param {Object} movie - movie object, may have tmdbPoster and Poster fields
 * @returns {string} - URL of the poster image
 */
function resolvePoster(movie) {
  if (!movie) return placeholder;

  // 1️⃣ TMDb poster
  if (movie.tmdbPoster && movie.tmdbPoster !== "") {
    return movie.tmdbPoster;
  }

  // 2️⃣ OMDb poster (skip if "N/A" or empty)
  if (movie.Poster && movie.Poster !== "N/A" && movie.Poster !== "") {
    return movie.Poster;
  }

  // 3️⃣ fallback to local placeholder
  return placeholder;
}

export { resolvePoster };
