import type { AuthUser, LoginRequest, RecoverRequest, RegisterRequest } from '@/types/auth.types';
import { storageService } from '@/services/storage.service';

const AUTH_USER_KEY = 'aio-auth-user';
const ROLE_KEY = 'role';

function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 250));
}

export const authService = {
  async login(payload: LoginRequest): Promise<AuthUser> {
    await sleep();

    let user: AuthUser | null = null;
    if (payload.username === 'admin' && payload.password === 'admin') {
      user = { username: 'admin', role: 'ADMIN' };
    }
    if (payload.username === 'user' && payload.password === 'user') {
      user = { username: 'user', role: 'USER' };
    }

    if (!user) {
      throw new Error('Invalid credentials');
    }

    storageService.set(AUTH_USER_KEY, user);
    localStorage.setItem(ROLE_KEY, user.role);
    return user;
  },

  async register(_: RegisterRequest) {
    await sleep();
  },

  async recover(_: RecoverRequest) {
    await sleep();
  },

  logout() {
    storageService.remove(AUTH_USER_KEY);
    localStorage.removeItem(ROLE_KEY);
  },

  getCurrentUser(): AuthUser | null {
    return storageService.get<AuthUser | null>(AUTH_USER_KEY, null);
  }
};