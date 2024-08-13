import { useEffect, useState } from "react";

import { tempMovieData, tempWatchedData } from "./data";
import Header, { Logo, Results, Search } from "./Header";
import Box, { Loader, MoviesList } from "./ListBox";
import WatchedBox, { Summary, WatchedMoviesList } from "./WatchedBox";

const apiKey = process.env.REACT_APP_OMDB_API_KEY;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const query = "inception";

  useEffect(function () {
    (async function () {
      setIsLoading(true);
      const resp = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
      );
      const data = await resp.json();
      setMovies(data.Search);
      setIsLoading(false);
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
        <Box>{isLoading ? <Loader /> : <MoviesList movies={movies} />}</Box>
        <Box>
          <Summary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </main>
    </>
  );
}
