import { useEffect, useRef, useState } from "react";
import { useAddEventListener } from "./useAddEventListener";

export default function Header({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  const inputRef = useRef(null);
  const callBack = (e) => {
    if (document.activeElement === inputRef.current) return;
    if (e.key === "Enter") {
      inputRef.current.focus();
      setQuery("");
    }
  };
  useAddEventListener("keydown", callBack);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputRef}
    />
  );
}

function Results({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export { Logo, Search, Results };
