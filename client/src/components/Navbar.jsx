import { NavLink, Link } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

import "../styles/Navbar.css";

import logoPic from "../assets/logo.png";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        <img
          src={logoPic}
          alt="Joshua Craven portfolio logo"
          className="logo-image"
        />

        <h2>Joshua Craven</h2>
      </Link>

      {/* Navigation */}
      <ul className="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/projects">Projects</NavLink>
        </li>

        <li>
          <NavLink to="/experience">Experience</NavLink>
        </li>

        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>

        {isAuthenticated && user?.role === "admin" && (
          <li>
            <NavLink to="/admin/projects">
              Admin
            </NavLink>
          </li>
        )}

        {!isAuthenticated && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}

        {isAuthenticated && (
          <li>
            <button
              type="button"
              onClick={logout}
              className="logout-button"
            >
              Logout
            </button>
          </li>
        )}
      </ul>

      {/* Logged-in user */}
      {isAuthenticated && user && (
        <span className="user-email">
          {user.email}
        </span>
      )}

      {/* Theme */}
      <ThemeToggle />
    </nav>
  );
}

export default Navbar;
