import { useState } from "react";

import { tempMovieData, tempWatchedData } from "./data";
import Header from "./Header";
import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";

export default function App() {
  return (
    <>
      <Header />
      <main className="main">
        <ListBox />
        <WatchedBox />
      </main>
    </>
  );
}
