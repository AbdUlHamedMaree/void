import React from 'react';
import { TripsStackNavigator } from './navigator';
import { AllTripsScreen } from '$screens/main/trips/all';
import { SingleTripsScreen } from '$screens/main/trips/single';

export const TripsStackNavigation: React.FC = () => (
  <TripsStackNavigator.Navigator initialRouteName='All'>
    <TripsStackNavigator.Screen
      name='All'
      component={AllTripsScreen}
      options={{ headerShown: false }}
    />
    <TripsStackNavigator.Screen
      name='Single'
      component={SingleTripsScreen}
      options={{ headerShown: true }}
    />
  </TripsStackNavigator.Navigator>
);
