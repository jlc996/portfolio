// Import React Router components for client-side navigation
import { Routes, Route } from "react-router-dom";

// Import reusable layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import page components
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";

// Import Theme Context
import { ThemeProvider, useTheme } from "./context/ThemeContext";

// Import global theme variables
import "./styles/Theme.css";

// Import global application styles
import "./styles/App.css";

// Component that can access theme state
function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? "dark-theme app" : "light-theme app"}>
      {/* Persistent navigation */}
      <Navbar />

      {/* Main content area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Persistent footer */}
      <Footer />
    </div>
  );
}

// Main App component
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;