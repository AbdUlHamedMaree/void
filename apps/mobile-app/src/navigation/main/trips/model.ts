import { RootStackParamList, RootStackScreenProps } from '$navigation/model';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabsParamList, MainTabsScreenProps } from '../model';

export type TripsStackParamList = {
  All: undefined;
  Single: {
    id: number;
  };
  Filters: undefined;
};

export type TripsStackScreenProps<T extends keyof TripsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<TripsStackParamList, T>,
    CompositeScreenProps<
      MainTabsScreenProps<keyof MainTabsParamList>,
      RootStackScreenProps<keyof RootStackParamList>
    >
  >;
