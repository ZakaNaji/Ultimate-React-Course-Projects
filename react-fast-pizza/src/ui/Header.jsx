import { Link } from "react-router-dom";
import Search from "./Search";

export default function Header() {
  return (
    <header className="bg-yellow-500">
      <Link to="/">React fast pizza Co.</Link>
      <Search />
    </header>
  );
}
