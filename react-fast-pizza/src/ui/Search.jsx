import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    setQuery("");
    navigate(`/order/${query}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
