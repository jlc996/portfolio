// Navbar.jsx

import { NavLink, Link } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

import "../styles/Navbar.css";

import logoPic from "../assets/logo.png";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">

      {/* ==========================
          Logo Section
      ========================== */}

      <Link
        to="/"
        className="logo"
      >
        <img
          src={logoPic}
          alt="portfolio logo"
          className="logo-image"
        />

        <h2>
          Joshua Craven
        </h2>
      </Link>


      {/* ==========================
          Navigation Links
      ========================== */}

      <ul className="nav-links">

        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/projects">
            Projects
          </NavLink>
        </li>

        <li>
          <NavLink to="/experience">
            Experience
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact">
            Contact
          </NavLink>
        </li>

        {!isAuthenticated && (
          <li>
            <NavLink to="/login">
              Login
            </NavLink>
          </li>
        )}

        {isAuthenticated && (
          <li>
            <button
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        )}

      </ul>


      {/* ==========================
          Authentication Status
      ========================== */}

      {isAuthenticated && user && (
        <span>
          {user.email}
        </span>
      )}


      {/* ==========================
          Theme Controls
      ========================== */}

      <ThemeToggle />

    </nav>
  );
}

export default Navbar;