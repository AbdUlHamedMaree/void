import { hideRootTabsAtom } from '$atoms/hide-root-tabs';
import { useSetAtom } from 'jotai';
import { useLayoutEffect } from 'react';

export const useHideRootTabs = () => {
  const setHideRootTabs = useSetAtom(hideRootTabsAtom);

  useLayoutEffect(() => {
    setHideRootTabs(true);

    return () => {
      setHideRootTabs(false);
    };
  }, []);
};
