import { Suspense } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Text, ThemeProvider } from '$theme';
import { useAppTheme } from '$stores';
import { RootStack } from '$navigation';

const Application: React.FC = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar barStyle='default' />
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export const App: React.FC = () => {
  LogBox.ignoreAllLogs();

  const dark = useAppTheme(state => state.dark);

  return (
    <ThemeProvider dark={dark}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Suspense fallback={<Text variant='Body1'>Loading...</Text>}>
          <Application />
        </Suspense>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};
