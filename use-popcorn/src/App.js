import { useState } from "react";

import { tempMovieData, tempWatchedData } from "./data";
import Header, { Logo, Results, Search } from "./Header";
import Box, { MoviesList } from "./ListBox";
import WatchedBox, { Summary, WatchedMoviesList } from "./WatchedBox";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Header>
        <Logo />
        <Search />
        <Results movies={movies} />
      </Header>
      <main className="main">
        <Box>
          <MoviesList movies={movies} />
        </Box>
        <Box>
          <Summary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </main>
    </>
  );
}
