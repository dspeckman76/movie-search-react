// src/services/api.js

const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

/**
 * Search movies by title
 */
export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`
  );

  const data = await res.json();

  if (data.Response === "False") {
    return [];
  }

  return data.Search || [];
}

/**
 * Get full movie details by IMDb ID
 */
export async function getMovieDetails(imdbID) {
  const res = await fetch(
    `${BASE_URL}?i=${imdbID}&plot=full&apikey=${OMDB_API_KEY}`
  );

  const data = await res.json();
  return data;
}

