import { Suspense } from 'react';
import { StatusBar, LogBox, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Text, ThemeProvider } from '$theme';
import { useAppTheme } from '$stores';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return <Button title="Go to Jane's profile" onPress={() => {}} />;
};
const ProfileScreen = () => {
  return <Text variant="Body1">ProfileScreen</Text>;
};

const Application: React.FC = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar barStyle="default" />
      <NavigationContainer>
        {/* <Box flex={1} justifyContent="center" alignItems="center">
          <Text variant="Body1">Welcome To XFlame CodeBase</Text>
        </Box> */}
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export const App: React.FC = () => {
  LogBox.ignoreAllLogs();

  const dark = useAppTheme((state) => state.dark);

  return (
    <ThemeProvider dark={dark}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Suspense fallback={<Text variant="Body1">Loading...</Text>}>
          <Application />
        </Suspense>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};
