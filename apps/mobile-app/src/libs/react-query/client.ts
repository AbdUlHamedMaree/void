import { QueryClient } from '@tanstack/react-query';
import './online-manager';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: true,
      refetchOnMount: true,
      refetchInterval: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
    },
    mutations: {},
  },
});
