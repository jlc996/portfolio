// Navbar.jsx

// Import React Router components
// NavLink provides client-side navigation with active link styling
// Link makes the logo clickable and routes back to the homepage
import { NavLink, Link } from "react-router-dom";

// Import theme toggle component
import ThemeToggle from "./ThemeToggle";

// Import navbar styles
import "../styles/Navbar.css";

import logoPic from "../assets/logo.png";

// Navigation component
function Navbar() {

  return (

    // Main navigation container
    <nav className="navbar">


      {/* ==========================
          Logo Section
      ========================== */}

      {/* Clicking the logo returns the user to Home */}
      <Link
        to="/"
        className="logo"
      >

        {/* Portfolio Logo */}
        <img
          src={logoPic}
          alt="portfolio logo"
          className="logo-image"
        />

        {/* Developer Name */}
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

      </ul>



      {/* ==========================
          Theme Controls
      ========================== */}

      {/* Switches between light and dark mode */}
      <ThemeToggle />


    </nav>

  );
}


// Export Navbar component
export default Navbar;