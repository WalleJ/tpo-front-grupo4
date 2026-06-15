import { storageService } from '@/services/storage.service';

const AUTH_USER_KEY = 'aio-auth-user';
const ROLE_KEY = 'role';

function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 250));
}

export const authService = {
  async login(payload) {
    await sleep();

    let user = null;
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

  async register(_) {
    await sleep();
  },

  async recover(_) {
    await sleep();
  },

  logout() {
    storageService.remove(AUTH_USER_KEY);
    localStorage.removeItem(ROLE_KEY);
  },

  getCurrentUser() {
    return storageService.get(AUTH_USER_KEY, null);
  }
};
