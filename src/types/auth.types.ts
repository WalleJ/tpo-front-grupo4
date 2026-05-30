import type { Role } from '@/types/common.types';

export interface AuthUser {
  username: string;
  role: Role;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface RecoverRequest {
  email: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  login: (payload: LoginRequest) => Promise<void>;
  logout: () => void;
  register: (payload: RegisterRequest) => Promise<void>;
  recover: (payload: RecoverRequest) => Promise<void>;
}