// src/services/api.js

import blankPoster from "../assets/blank-poster.png";

const OMDB_KEY = process.env.REACT_APP_OMDB_API_KEY;
const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;

export async function searchMoviesWithPosters(query) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  if (!data.Search) return [];

  return Promise.all(
    data.Search.map(async (movie) => {
      let fullData;

      try {
        const detailRes = await fetch(
          `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${movie.imdbID}&plot=short`
        );
        fullData = await detailRes.json();
      } catch {
        fullData = movie;
      }

      let poster =
        fullData.Poster && fullData.Poster !== "N/A"
          ? fullData.Poster
          : null;

      if (!poster) {
        try {
          const tmdbRes = await fetch(
            `https://api.themoviedb.org/3/find/${movie.imdbID}?api_key=${TMDB_KEY}&external_source=imdb_id`
          );
          const tmdbData = await tmdbRes.json();
          const tmdbMovie = tmdbData.movie_results?.[0];

          if (tmdbMovie?.poster_path) {
            poster = `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`;
          }
        } catch {}
      }

      return {
        ...fullData,
        Poster: poster || blankPoster,
      };
    })
  );
}

