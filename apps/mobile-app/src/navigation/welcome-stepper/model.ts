import { RootStackParamList, RootStackScreenProps } from '$navigation/model';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type WelcomeStepperParamsList = {
  StepOne: undefined;
  StepTwo: undefined;
  StepThree: undefined;
};

export type WelcomeStepperScreenProps<T extends keyof WelcomeStepperParamsList> =
  CompositeScreenProps<
    StackScreenProps<WelcomeStepperParamsList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
