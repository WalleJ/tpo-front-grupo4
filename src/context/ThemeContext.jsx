import { createContext, useEffect, useMemo, useState } from "react";
const ThemeContext = createContext(null);
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("aio-theme");
    return stored === "dark" ? "dark" : "light";
  });
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("aio-theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.classList.toggle("light", next === "light");
      return next;
    });
  };
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export {
  ThemeContext,
  ThemeProvider
};
