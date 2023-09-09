import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Box, ThemeProvider } from '$theme';
import { Text } from '$components';
import { useAppTheme } from '$store';

const Application = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text variant="Body1" color="Dark">
            Welcome To XFlame CodeBase
          </Text>
        </Box>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export const App = () => {
  LogBox.ignoreAllLogs();

  const dark = useAppTheme((state) => state.dark);

  return (
    <ThemeProvider dark={dark}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Application />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};
