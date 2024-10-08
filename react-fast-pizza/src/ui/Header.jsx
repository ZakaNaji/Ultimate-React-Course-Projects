import { Link } from "react-router-dom";
import Search from "./Search";
import User from "./User";

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase">
      <Link to="/" className="tracking-widest">
        React fast pizza Co.
      </Link>
      <Search />
      <User />
    </header>
  );
}
