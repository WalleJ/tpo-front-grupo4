import { createContext, useMemo, useState } from "react";
import { authService } from "@/services/auth.service";
const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const login = async (payload) => {
    const authUser = await authService.login(payload);
    setUser(authUser);
  };
  const logout = () => {
    authService.logout();
    setUser(null);
  };
  const register = async (payload) => {
    await authService.register(payload);
  };
  const recover = async (payload) => {
    await authService.recover(payload);
  };
  const value = useMemo(() => ({ user, login, logout, register, recover }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export {
  AuthContext,
  AuthProvider
};
