import React from 'react';
import { AccountStackNavigator } from './navigator';
import { Badge, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai';
import { tripsFiltersAtom } from '$atoms/trips-filters';
import { View } from 'react-native';
import { MainProfileAccountMainScreen } from '$screens/main/profile/account/main';
import { MainProfileAccountMyTripsScreen } from '$screens/main/profile/account/my-trips';

export const AccountStackNavigation: React.FC = () => {
  const { navigate } = useNavigation();
  const tripsFilters = useAtomValue(tripsFiltersAtom);

  return (
    <AccountStackNavigator.Navigator initialRouteName='Main'>
      <AccountStackNavigator.Screen
        name='Main'
        component={MainProfileAccountMainScreen}
        options={{ headerShown: false }}
      />
      <AccountStackNavigator.Screen
        name='MyTrips'
        component={MainProfileAccountMyTripsScreen}
        options={{
          headerShown: true,
          headerTitle: 'My Trips',
          headerRight: () => (
            <View style={{ position: 'relative' }}>
              <IconButton
                icon='filter-outline'
                onPress={() =>
                  navigate('Main', { screen: 'Trips', params: { screen: 'Filters' } })
                }
              />
              <Badge
                visible={!!tripsFilters}
                size={8}
                style={{ position: 'absolute', top: 4, right: 4 }}
              />
            </View>
          ),
        }}
      />
    </AccountStackNavigator.Navigator>
  );
};
