import { mmkvInstance } from './instance';

export type Callback<T> = (value: T) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const subscribers: Record<string, Callback<any>[] | undefined> = {};

export const appStorage = {
  set: <T>(key: string, value: T) => {
    const stringifiedValue = JSON.stringify(value);
    mmkvInstance.set(key, stringifiedValue);
  },
  get: <T, F = null>(key: string, fallbackValue: F = null as F) => {
    const stringifiedValue = mmkvInstance.getString(key);
    if (!stringifiedValue) return fallbackValue;

    try {
      const value = JSON.parse(stringifiedValue) as T;
      return value;
    } catch (err) {
      console.error(
        `[void][storage] failed to parse value storage with key: ${key}, the value: ${stringifiedValue}`
      );
      console.error(err);
      return fallbackValue;
    }
  },
  delete: mmkvInstance.delete.bind(mmkvInstance),
  clearAll: mmkvInstance.clearAll.bind(mmkvInstance),
  contains: mmkvInstance.contains.bind(mmkvInstance),
  getAllKeys: mmkvInstance.getAllKeys.bind(mmkvInstance),
  subscribe: <T>(key: string, cb: Callback<T>) => {
    const listeners = (subscribers[key] = subscribers[key] || []);
    listeners.push(cb);

    return () => appStorage.unsubscribe(key, cb);
  },
  unsubscribe: <T>(key: string, cb?: Callback<T>) => {
    const listeners = (subscribers[key] = subscribers[key] || []);
    if (cb) {
      const index = listeners.indexOf(cb);
      if (index === -1)
        return console.warn(
          `[void][storage] failed to unsubscribe to the passed callback for key: [${key}] because the callback wasn't found`
        );

      listeners.splice(index, 1);
    }
    listeners.splice(0, listeners.length);
  },
};

mmkvInstance.addOnValueChangedListener(key => {
  const listeners = subscribers[key];

  listeners?.forEach(cb => cb(appStorage.get(key)));
});
