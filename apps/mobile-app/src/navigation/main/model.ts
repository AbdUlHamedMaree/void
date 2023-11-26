import { RootStackParamList, RootStackScreenProps } from '$navigation/model';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { MaterialBottomTabScreenProps } from 'react-native-paper';
import { ProfileStackParamList } from './profile/model';
import { TripsStackParamList } from './trips/model';
import { ParamListWithBase } from '$types/param-list-with-base';

export type MainTabsParamList = {
  Home: ParamListWithBase;
  Trips: NavigatorScreenParams<TripsStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type MainTabsScreenProps<T extends keyof MainTabsParamList> = CompositeScreenProps<
  MaterialBottomTabScreenProps<MainTabsParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;
