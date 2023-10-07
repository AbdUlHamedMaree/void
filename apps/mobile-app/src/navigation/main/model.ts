import { RootStackParamList, RootStackScreenProps } from '$navigation/model';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { MaterialBottomTabScreenProps } from 'react-native-paper';
import { ProfileStackParamList } from './profile/model';
import { TripsStackParamList } from './trips/model';

export type MainTabsParamList = {
  Home: undefined;
  Trips: NavigatorScreenParams<TripsStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type MainTabsScreenProps<T extends keyof MainTabsParamList> = CompositeScreenProps<
  MaterialBottomTabScreenProps<MainTabsParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;
