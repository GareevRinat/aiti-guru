import { create } from 'zustand';
import type { AuthUser } from '@/shared/types/index.ts';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, rememberMe: boolean) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user, rememberMe) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('accessToken', user.accessToken);
    storage.setItem('user', JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },

  hydrate: () => {
    const tokenFromLocal = localStorage.getItem('accessToken');
    const tokenFromSession = sessionStorage.getItem('accessToken');
    const userJson = localStorage.getItem('user') ?? sessionStorage.getItem('user');

    if ((tokenFromLocal ?? tokenFromSession) && userJson) {
      try {
        const user = JSON.parse(userJson) as AuthUser;
        set({ user, isAuthenticated: true });
      } catch {
        set({ user: null, isAuthenticated: false });
      }
    }
  },
}));
