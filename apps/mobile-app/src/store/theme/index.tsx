import { create } from 'zustand';
import localStorage from '@react-native-async-storage/async-storage';
type State = {
  dark: boolean;
  setTheme: (dark: boolean) => void;
};
export const useAppTheme = create<State>((set) => ({
  dark: false,
  setTheme: async (dark) => {
    set({ dark });
    await localStorage.setItem('Codbase-Theme', dark.toString());
  },
}));
