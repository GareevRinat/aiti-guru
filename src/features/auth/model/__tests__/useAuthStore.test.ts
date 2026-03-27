import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../useAuthStore.ts';
import type { AuthUser } from '@/shared/types/index.ts';

const mockUser: AuthUser = {
  id: 1,
  username: 'emilys',
  email: 'emily@test.com',
  firstName: 'Emily',
  lastName: 'Smith',
  gender: 'female',
  image: '',
  accessToken: 'test-token-123',
  refreshToken: 'refresh-token-456',
};

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false });
  });

  describe('login', () => {
    it('sets user and isAuthenticated', () => {
      useAuthStore.getState().login(mockUser, false);

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('stores token in localStorage when rememberMe is true', () => {
      useAuthStore.getState().login(mockUser, true);

      expect(localStorage.getItem('accessToken')).toBe('test-token-123');
      expect(sessionStorage.getItem('accessToken')).toBeNull();
    });

    it('stores token in sessionStorage when rememberMe is false', () => {
      useAuthStore.getState().login(mockUser, false);

      expect(sessionStorage.getItem('accessToken')).toBe('test-token-123');
      expect(localStorage.getItem('accessToken')).toBeNull();
    });
  });

  describe('logout', () => {
    it('clears user and tokens from both storages', () => {
      useAuthStore.getState().login(mockUser, true);
      useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(sessionStorage.getItem('accessToken')).toBeNull();
    });
  });

  describe('hydrate', () => {
    it('restores user from localStorage', () => {
      localStorage.setItem('accessToken', 'test-token');
      localStorage.setItem('user', JSON.stringify(mockUser));

      useAuthStore.getState().hydrate();

      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
      expect(state.user?.username).toBe('emilys');
    });

    it('restores user from sessionStorage', () => {
      sessionStorage.setItem('accessToken', 'test-token');
      sessionStorage.setItem('user', JSON.stringify(mockUser));

      useAuthStore.getState().hydrate();

      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });

    it('handles invalid JSON gracefully', () => {
      localStorage.setItem('accessToken', 'test-token');
      localStorage.setItem('user', 'not-valid-json');

      useAuthStore.getState().hydrate();

      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });

    it('does nothing when no token exists', () => {
      useAuthStore.getState().hydrate();

      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().user).toBeNull();
    });
  });
});
