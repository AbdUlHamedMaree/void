import { appStorage } from './app-storage';

export type CreateStorage<T, F = null> = (
  key: string,
  baseFallbackValue: F
) => {
  set: (value: T | F) => void;
  get: <L = F>(fallbackValue?: L) => T | L;
  delete: () => void;
};

export const createStorage = <T, F = null>(
  key: string,
  baseFallbackValue: F = null as F
) => ({
  set: (value: T | F) => appStorage.set<T | F>(key, value),
  get: <L = F>(fallbackValue: L = null as L) =>
    appStorage.get<T, L>(key, (fallbackValue ?? baseFallbackValue) as L),
  delete: () => appStorage.delete(key),
});
