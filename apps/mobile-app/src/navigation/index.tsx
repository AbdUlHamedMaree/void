import React from 'react';
import { RootStackNavigator } from './navigator';
import { WelcomeStepperScreen } from '$screens/welcome-stepper';
import { MainTabsNavigation } from './main';
import { useAtomValue } from 'jotai/react';
import { isWelcomeStepperSkippedAtom } from '$atoms/is-welcome-stepper-skipped';
import { CreateNewTripScreen } from '$screens/create-new-trip';

export const RootStack: React.FC = () => {
  const isWelcomeStepperSkipped = useAtomValue(isWelcomeStepperSkippedAtom);

  return (
    <RootStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={isWelcomeStepperSkipped ? 'Main' : 'WelcomeStepper'}
    >
      <RootStackNavigator.Screen name='WelcomeStepper' component={WelcomeStepperScreen} />
      <RootStackNavigator.Screen name='Main' component={MainTabsNavigation} />
      <RootStackNavigator.Screen name='CreateNewTrip' component={CreateNewTripScreen} />
    </RootStackNavigator.Navigator>
  );
};
