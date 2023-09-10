import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeStepperParamsList } from './model';

export const WelcomeStepperNavigator =
  createNativeStackNavigator<WelcomeStepperParamsList>();
