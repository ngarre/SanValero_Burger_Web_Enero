import { NavLink } from "react-router-dom";
import "./Navbar.css";

export function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className="nav-link">
        Home
      </NavLink>

      <NavLink to="/burgers" className="nav-link">
        Burgers
      </NavLink>
    </nav>
  );
}
