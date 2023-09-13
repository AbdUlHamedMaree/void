import { Dispatch, useCallback, useState } from 'react';
import { appStorage } from './app-storage';
import { SetStateAction } from 'jotai/vanilla';

export function usePersistedState<T>(
  key: string
): [T | undefined, Dispatch<SetStateAction<T | undefined>>];

export function usePersistedState<T>(
  key: string,
  initialState: T
): [T, Dispatch<SetStateAction<T>>];

export function usePersistedState<T>(key: string, initialState?: T) {
  const [storageValue] = useState(() => appStorage.get<T>(key));

  const [value, setValue] = useState(storageValue ?? initialState);

  const setValueWithStorage = useCallback<typeof setValue>(
    valueOrSetter => {
      if (typeof valueOrSetter === 'function') {
        const setter = valueOrSetter as (value: T | undefined) => T | undefined;
        setValue(oldVal => {
          const newVal = setter(oldVal);
          appStorage.set(key, newVal);
          return newVal;
        });
      }

      const value = valueOrSetter;

      appStorage.set(key, value);
      setValue(value);
    },
    [key]
  );

  return [value, setValueWithStorage];
}
