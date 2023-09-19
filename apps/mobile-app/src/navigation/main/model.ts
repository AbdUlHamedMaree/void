import { RootStackParamList, RootStackScreenProps } from '$navigation/model';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { MaterialBottomTabScreenProps } from 'react-native-paper';
import { ProfileStackParamList } from './profile/model';

export type MainTabsParamList = {
  Home: undefined;
  Trips: undefined;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type MainTabsScreenProps<T extends keyof MainTabsParamList> = CompositeScreenProps<
  MaterialBottomTabScreenProps<MainTabsParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;
