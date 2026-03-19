import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { UserProfile } from '@/lib/types';

interface AuthState {
  user:          UserProfile | null;
  accessToken:   string | null;
  refreshToken:  string | null;
  isAuthenticated: boolean;

  setAuth:   (user: UserProfile, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:            null,
      accessToken:     null,
      refreshToken:    null,
      isAuthenticated: false,

      setAuth: (user, accessToken, refreshToken) => {
        Cookies.set('access_token',  accessToken,  { expires: 1,  secure: true, sameSite: 'strict' });
        Cookies.set('refresh_token', refreshToken, { expires: 7,  secure: true, sameSite: 'strict' });
        set({ user, accessToken, refreshToken, isAuthenticated: true });
      },

      clearAuth: () => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
      },

      updateUser: (partial) =>
        set((state) => ({ user: state.user ? { ...state.user, ...partial } : null })),
    }),
    {
      name:    'domus-pacis-auth',
      partialize: (s) => ({ user: s.user, accessToken: s.accessToken, refreshToken: s.refreshToken, isAuthenticated: s.isAuthenticated }),
    }
  )
);
