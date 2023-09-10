import { create } from 'zustand';
import localStorage from '@react-native-async-storage/async-storage';
import { ThemeStore } from './model';

export const useAppTheme = create<ThemeStore>((set) => ({
  dark: false,
  setDark: async (dark) => {
    set({ dark });
    await localStorage.setItem('void-dark-mode', dark.toString());
  },
}));
