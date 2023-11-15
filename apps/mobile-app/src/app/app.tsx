import { Suspense } from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { RootStack } from '$navigation';
import { AppPaperProvider } from '$theme/provider';
import { AppStatusBar } from '$components/smart/app-status-bar';
import { AppNavigationContainer } from '$components/smart/app-navigation-container';
import { commonStyles } from '$styles/common';
import { WeakSplashScreen } from '$screens/weak-splash-screen';
import { SplashScreen } from '$screens/splash-screen';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_SERVICES_API } from '@env';
import { PaperToastContainer } from '$modules/react-native-paper-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '$libs/react-query/client';
import { useRefetchOnAppFocus } from '$libs/react-query/use-refetch-on-app-focus';
import { useAxiosService } from '$libs/axios/hooks';
import { AppErrorBoundary } from '$components/dumb/app-error-boundary';

Geocoder.init(GOOGLE_SERVICES_API);

const Application: React.FC = () => {
  useRefetchOnAppFocus();
  useAxiosService();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppPaperProvider>
        <AppErrorBoundary>
          <AppStatusBar />
          <AppNavigationContainer>
            <Suspense fallback={<SplashScreen />}>
              <PaperToastContainer variant='contained' />

              <RootStack />
            </Suspense>
          </AppNavigationContainer>
        </AppErrorBoundary>
      </AppPaperProvider>
    </SafeAreaProvider>
  );
};

export const App: React.FC = () => {
  // LogBox.ignoreAllLogs();

  return (
    <Suspense fallback={<WeakSplashScreen />}>
      <AppErrorBoundary>
        <GestureHandlerRootView style={commonStyles.flexFull}>
          <QueryClientProvider client={queryClient}>
            <Application />
          </QueryClientProvider>
        </GestureHandlerRootView>
      </AppErrorBoundary>
    </Suspense>
  );
};
