import { RootStackParamList, RootStackScreenProps } from '$navigation/model';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainTabsParamList, MainTabsScreenProps } from '../../model';
import { ProfileStackScreenProps } from '../model';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListWithBase } from '$types/param-list-with-base';

export type AccountStackParamList = {
  AccountMain: ParamListWithBase;
  MyTrips: ParamListWithBase;
  TripsFilters: ParamListWithBase;
  SingleTrip: ParamListWithBase<{
    id: number;
  }>;
};

export type AccountStackScreenProps<T extends keyof AccountStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AccountStackParamList, T>,
    CompositeScreenProps<
      ProfileStackScreenProps<'Account'>,
      CompositeScreenProps<
        RootStackScreenProps<keyof RootStackParamList>,
        MainTabsScreenProps<keyof MainTabsParamList>
      >
    >
  >;
