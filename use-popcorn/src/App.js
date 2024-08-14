import { useEffect, useState } from "react";

import { tempMovieData, tempWatchedData } from "./data";
import Header, { Logo, Results, Search } from "./Header";
import Box, { Error as ErrorMessage, Loader, MoviesList } from "./ListBox";
import WatchedBox, { Summary, WatchedMoviesList } from "./WatchedBox";

const apiKey = process.env.REACT_APP_OMDB_API_KEY;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const query = "qsfqf";

  useEffect(function () {
    (async function () {
      try {
        setIsLoading(true);
        const resp = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
        );
        if (!resp.ok) {
          throw new Error("Error fetching movies");
        }
        const data = await resp.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Header>
        <Logo />
        <Search />
        <Results movies={movies} />
      </Header>
      <main className="main">
        <Box>
          {error ? (
            <ErrorMessage message={error} />
          ) : isLoading ? (
            <Loader />
          ) : (
            <MoviesList movies={movies} />
          )}
        </Box>
        <Box>
          <Summary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </main>
    </>
  );
}
