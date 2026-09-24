import { createContext, useContext, useState } from "react";

// Create the Theme Context
const ThemeContext = createContext();

// Theme Provider
export function ThemeProvider({ children }) {
  // Track whether dark mode is enabled
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle between light and dark themes
  function toggleTheme() {
    setIsDarkMode((prevMode) => !prevMode);
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using the theme
export function useTheme() {
  return useContext(ThemeContext);
}