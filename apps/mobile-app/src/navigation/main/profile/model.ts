import { RootStackParamList, RootStackScreenProps } from '$navigation/model';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabsParamList, MainTabsScreenProps } from '../model';
import { AccountStackParamList } from './account/model';

export type ProfileStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Account: NavigatorScreenParams<AccountStackParamList>;
  OTP: {
    phone: string;
    // TODO: remove later.
    otp: string;
  };
};

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParamList, T>,
    CompositeScreenProps<
      RootStackScreenProps<keyof RootStackParamList>,
      MainTabsScreenProps<keyof MainTabsParamList>
    >
  >;
