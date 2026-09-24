// Footer.jsx

// Import the footer stylesheet
import "../styles/Footer.css";

// Footer component
function Footer() {
  return (
    // Footer section displayed on every page
    <footer className="footer">

      {/* Portfolio information */}
      <div className="footer-content">

        {/* Copyright */}
        <p>
          &copy; {new Date().getFullYear()} Joshua Craven. All rights reserved.
        </p>

        {/* Social and professional links */}
        <div className="footer-links">

          <a
            href="https://github.com/jlc996"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/joshualeecraven"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          <a href="mailto:josh96craven@gmail.com">
            Email
          </a>

        </div>

      </div>

    </footer>
  );
}

// Export the Footer component
export default Footer;