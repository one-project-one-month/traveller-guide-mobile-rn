import { create } from 'zustand';

interface AppState {
  isOnboardingCompleted: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
  setOnboardingCompleted: (completed: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  setNotifications: (enabled: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOnboardingCompleted: false,
  theme: 'system',
  language: 'en',
  notifications: true,

  setOnboardingCompleted: (completed: boolean) => {
    set({ isOnboardingCompleted: completed });
  },

  setTheme: (theme: 'light' | 'dark' | 'system') => {
    set({ theme });
  },

  setLanguage: (language: string) => {
    set({ language });
  },

  setNotifications: (enabled: boolean) => {
    set({ notifications: enabled });
  },
}));
