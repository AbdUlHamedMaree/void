import { RootStackParamList, RootStackScreenProps } from '$navigation/model';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabsParamList, MainTabsScreenProps } from '../model';
import { ParamListWithBase } from '$types/param-list-with-base';

export type TripsStackParamList = {
  All: ParamListWithBase;
  Single: ParamListWithBase<{
    id: number;
  }>;
  Filters: ParamListWithBase;
};

export type TripsStackScreenProps<T extends keyof TripsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<TripsStackParamList, T>,
    CompositeScreenProps<
      MainTabsScreenProps<keyof MainTabsParamList>,
      RootStackScreenProps<keyof RootStackParamList>
    >
  >;
