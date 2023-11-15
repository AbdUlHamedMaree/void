import { useCallback } from 'react';

export const useNewStateSetter = <T>(
  setter: React.Dispatch<React.SetStateAction<T>>,
  cb?: (state: T) => void
) =>
  useCallback<React.Dispatch<React.SetStateAction<T>>>(
    stateOrFn =>
      setter(oldState => {
        const newState = getNewState(stateOrFn, oldState);

        cb?.(newState);
        return newState;
      }),
    [cb, setter]
  );

const getNewState = <T>(stateOrFn: React.SetStateAction<T>, oldState: T) => {
  if (typeof stateOrFn === 'function') {
    return (stateOrFn as (prevState: T) => T)(oldState);
  }
  return stateOrFn;
};
