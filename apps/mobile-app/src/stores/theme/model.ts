export type ThemeStoreState = {
  dark: boolean;
};

export type ThemeStoreActions = {
  setDark: (dark: boolean) => Promise<void>;
};

export type ThemeStore = ThemeStoreState & ThemeStoreActions;
