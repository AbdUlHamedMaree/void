import { appStorage } from './app-storage';

export const createStorage = <T, F = null>(
  key: string,
  baseFallbackValue: F = null as F
) => ({
  set: (value: T) => appStorage.set<T>(key, value),
  get: <L = F>(fallbackValue: L = null as L) =>
    appStorage.get<T, L>(key, (fallbackValue ?? baseFallbackValue) as L),
  delete: () => appStorage.delete(key),
});
