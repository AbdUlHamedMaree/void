import { Suspense } from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { RootStack } from '$navigation';
import { AppPaperProvider } from '$theme/provider';
import { AppStatusBar } from '$components/smart/app-status-bar';
import { AppNavigationContainer } from '$components/smart/app-navigation-container';
import { commonStyles } from '$styles/common';
import { WeakSplashScreen } from '$screens/weak-splash-screen';
import { SplashScreen } from '$screens/splash-screen';

const Application: React.FC = () => {
  return (
    <SafeAreaProvider style={commonStyles.flexFull}>
      <AppPaperProvider>
        <AppStatusBar />
        <AppNavigationContainer>
          <Suspense fallback={<SplashScreen />}>
            <RootStack />
          </Suspense>
        </AppNavigationContainer>
      </AppPaperProvider>
    </SafeAreaProvider>
  );
};

export const App: React.FC = () => {
  LogBox.ignoreAllLogs();

  return (
    <Suspense fallback={<WeakSplashScreen />}>
      <GestureHandlerRootView style={commonStyles.flexFull}>
        <Application />
      </GestureHandlerRootView>
    </Suspense>
  );
};
