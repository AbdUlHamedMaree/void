import type { StackScreenProps } from '@react-navigation/stack';
import { MainTabsParamList } from './main/model';
import { NavigatorScreenParams } from '@react-navigation/native';
import { ParamListWithBase } from '$types/param-list-with-base';

export type RootStackParamList = {
  WelcomeStepper: ParamListWithBase;
  Main: NavigatorScreenParams<MainTabsParamList>;
  CreateNewTrip: ParamListWithBase;
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
