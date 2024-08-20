import { Children, useEffect, useState } from "react";
import StarRating from "./StarRating";

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function MovieDetails({
  movieId,
  onCloseMovie,
  apiKey,
  onAddWatched,
  isAlreadyWatched,
}) {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState("");

  const handleAddWatched = () => {
    const watchedMovie = {
      imdbID: movieId,
      Title: movie.Title,
      Poster: movie.Poster,
      Released: movie.Released,
      imdbRating: movie.imdbRating,
      runtime: movie.Runtime.split(" ")[0],
      userRating: rating,
    };
    onAddWatched(watchedMovie);
    onCloseMovie();
  };

  useEffect(
    function () {
      (async function () {
        const resp = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`
        );
        const data = await resp.json();
        setMovie(data);
      })();
    },
    [movieId]
  );

  useEffect(
    function () {
      document.title = movie.Title || "usePopcorn";
      return () => {
        document.title = "usePopcorn";
      };
    },
    [movie.Title]
  );
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={movie.Poster} alt="" />
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>
            {movie.Released} &bull; {movie.Runtime}
          </p>
          <p>{movie.Genre}</p>
          <p>
            <span>⭐</span> {movie.imdbRating} IMDB rating
          </p>
        </div>
      </header>
      <section>
        {!isAlreadyWatched && (
          <div className="rating">
            <StarRating maxRating={10} size={24} onSetRating={setRating} />

            {rating > 0 && (
              <button className="btn-add" onClick={handleAddWatched}>
                + Add to list
              </button>
            )}
          </div>
        )}
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>Starring: {movie.Actors}</p>
        <p>Director: {movie.Director}</p>
      </section>
    </div>
  );
}

export { Summary, WatchedMoviesList, MovieDetails };

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
