import { hideRootTabsAtom } from '$atoms/hide-root-tabs';
import { useSetAtom } from 'jotai';
import { useLayoutEffect } from 'react';

export const useShowRootTabs = () => {
  const setHideRootTabs = useSetAtom(hideRootTabsAtom);

  useLayoutEffect(() => {
    setHideRootTabs(false);
  }, []);
};
