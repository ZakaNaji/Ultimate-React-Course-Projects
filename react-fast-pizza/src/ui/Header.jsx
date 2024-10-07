import { Link } from "react-router-dom";
import Search from "./Search";
import User from "./User";

export default function Header() {
  return (
    <header className="bg-yellow-500 uppercase">
      <Link to="/" className="tracking-widest">
        React fast pizza Co.
      </Link>
      <Search />
      <User />
    </header>
  );
}
