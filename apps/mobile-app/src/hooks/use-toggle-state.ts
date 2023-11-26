import { useCallback, useMemo, useState } from 'react';

export const useToggleState = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const toggle = useCallback(() => setIsOpen(v => !v), []);

  return useMemo(
    () => ({
      isOpen,
      set: setIsOpen,
      open,
      close,
      toggle,
    }),
    [close, isOpen, open, toggle]
  );
};
