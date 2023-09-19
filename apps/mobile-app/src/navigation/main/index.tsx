import React from 'react';
import { MainTabsNavigator } from './navigator';
import { MainTripsScreen } from '$screens/main/trips';
import { MainHomeScreen } from '$screens/main/home';
import { ProfileStackNavigation } from './profile';

export const MainTabsNavigation: React.FC = () => {
  return (
    <MainTabsNavigator.Navigator
      initialRouteName='Home'
      sceneAnimationType='shifting'
      sceneAnimationEnabled
    >
      <MainTabsNavigator.Screen
        name='Home'
        options={{ tabBarIcon: 'home' }}
        component={MainHomeScreen}
      />
      <MainTabsNavigator.Screen
        name='Trips'
        options={{
          tabBarIcon: 'transit-detour',
        }}
        component={MainTripsScreen}
      />
      <MainTabsNavigator.Screen
        name='Profile'
        options={{
          tabBarIcon: 'account',
        }}
        component={ProfileStackNavigation}
      />
    </MainTabsNavigator.Navigator>
  );
};
