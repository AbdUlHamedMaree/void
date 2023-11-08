import React from 'react';
import { TripsStackNavigator } from './navigator';
import { AllTripsScreen } from '$screens/main/trips/all';
import { SingleTripsScreen } from '$screens/main/trips/single';
import { Badge, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TripsFiltersScreen } from '$screens/main/trips/filters';
import { useAtomValue } from 'jotai';
import { tripsFiltersAtom } from '$atoms/trips-filters';
import { View } from 'react-native';

export const TripsStackNavigation: React.FC = () => {
  const { navigate } = useNavigation();
  const tripsFilters = useAtomValue(tripsFiltersAtom);

  return (
    <TripsStackNavigator.Navigator initialRouteName='All'>
      <TripsStackNavigator.Screen
        name='All'
        component={AllTripsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Trips',
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
      <TripsStackNavigator.Screen
        name='Single'
        component={SingleTripsScreen}
        options={{ headerShown: false }}
      />
      <TripsStackNavigator.Screen
        name='Filters'
        component={TripsFiltersScreen}
        options={{ headerShown: true }}
      />
    </TripsStackNavigator.Navigator>
  );
};
