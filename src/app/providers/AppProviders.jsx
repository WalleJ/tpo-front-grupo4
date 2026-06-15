import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
function AppProviders({ children }) {
  return <ThemeProvider><AuthProvider>{children}</AuthProvider></ThemeProvider>;
}
export {
  AppProviders
};
