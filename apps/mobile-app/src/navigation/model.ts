import type { StackScreenProps } from '@react-navigation/stack';
import { MainTabsParamList } from './main/model';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  WelcomeStepper: undefined;
  Main: NavigatorScreenParams<MainTabsParamList>;
  CreateNewTrip: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
