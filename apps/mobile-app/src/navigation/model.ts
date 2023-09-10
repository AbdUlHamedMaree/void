import { NavigatorScreenParams } from '@react-navigation/native';
import { WelcomeStepperParamsList } from './welcome-stepper/model';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  WelcomeStepper: NavigatorScreenParams<WelcomeStepperParamsList>;
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
