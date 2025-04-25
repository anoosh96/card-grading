import { User } from '@/types';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
}


// Combine devtools and persist middleware correctly
export const useUserStore = create<UserStore>()(
  persist(
    devtools(
      (set) => ({
        user: null,
        isAuthenticated: false,
        token: null,
        setUser: (user) => set({ user, isAuthenticated: true }),
        setToken: (token) => set({ token }),
        clearUser: () => set({ user: null, isAuthenticated: false, token: null })
      }),
      {
        name: 'UserStore', // Name of the store in Redux DevTools
      }
    ),
    {
      name: 'user-store', // Key for localStorage
    }
  )
);