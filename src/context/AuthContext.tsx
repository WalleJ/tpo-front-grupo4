import { createContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { AuthContextValue, AuthUser, LoginRequest, RecoverRequest, RegisterRequest } from '@/types/auth.types';
import { authService } from '@/services/auth.service';

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(() => authService.getCurrentUser());

  const login = async (payload: LoginRequest) => {
    const authUser = await authService.login(payload);
    setUser(authUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const register = async (payload: RegisterRequest) => {
    await authService.register(payload);
  };

  const recover = async (payload: RecoverRequest) => {
    await authService.recover(payload);
  };

  const value = useMemo(() => ({ user, login, logout, register, recover }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}