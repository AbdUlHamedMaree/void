import { useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useRefreshOnFocus = <T>(refetch: () => Promise<T>) => {
  const firstTimeRef = useRef(true);

  const refetchIfRequired = useCallback(() => {
    if (firstTimeRef.current) {
      firstTimeRef.current = false;
      return;
    }

    refetch();
  }, [refetch]);

  useFocusEffect(refetchIfRequired);
};
