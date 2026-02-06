import { NavLink } from "react-router-dom";

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

