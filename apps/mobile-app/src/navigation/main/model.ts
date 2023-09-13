import { RootStackParamList, RootStackScreenProps } from '$navigation/model';
import { CompositeScreenProps } from '@react-navigation/native';
import { MaterialBottomTabScreenProps } from 'react-native-paper';

export type MainTabsParamList = {
  Home: undefined;
  Trips: undefined;
};

export type MainTabsScreenProps<T extends keyof MainTabsParamList> = CompositeScreenProps<
  MaterialBottomTabScreenProps<MainTabsParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;
