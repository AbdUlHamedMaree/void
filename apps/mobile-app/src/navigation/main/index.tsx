import React from 'react';
import { MainTabsNavigator } from './navigator';
import { MainHomeScreen } from '$screens/main/home';
import { ProfileStackNavigation } from './profile';
import { TripsStackNavigation } from './trips';
import { useAtomValue } from 'jotai';
import { hideRootTabsAtom } from '$atoms/hide-root-tabs';

export const MainTabsNavigation: React.FC = () => {
  const hideRootTabs = useAtomValue(hideRootTabsAtom);

  return (
    <MainTabsNavigator.Navigator
      initialRouteName='Home'
      sceneAnimationType='shifting'
      sceneAnimationEnabled
      barStyle={hideRootTabs && { display: 'none' }}
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
        component={TripsStackNavigation}
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
