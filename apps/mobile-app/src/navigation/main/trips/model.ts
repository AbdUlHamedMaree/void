import { RootStackParamList, RootStackScreenProps } from '$navigation/model';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabsParamList, MainTabsScreenProps } from '../model';
import { IDUnion } from '$models/id';

export type TripsStackParamList = {
  All: undefined;
  Single: {
    id: IDUnion;
  };
};

export type TripsStackScreenProps<T extends keyof TripsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<TripsStackParamList, T>,
    CompositeScreenProps<
      RootStackScreenProps<keyof RootStackParamList>,
      MainTabsScreenProps<keyof MainTabsParamList>
    >
  >;
