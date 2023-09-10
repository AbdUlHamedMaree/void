import React from 'react';
import { WelcomeStepperNavigator } from './navigator';
import { WelcomeStepperStepOne } from '$screens/welcome-stepper/step-one';
import { WelcomeStepperStepTwo } from '$screens/welcome-stepper/step-two';
import { WelcomeStepperStepThree } from '$screens/welcome-stepper/step-three';

export const WelcomeStepperStack: React.FC = () => {
  return (
    <WelcomeStepperNavigator.Navigator>
      <WelcomeStepperNavigator.Screen name='StepOne' component={WelcomeStepperStepOne} />
      <WelcomeStepperNavigator.Screen name='StepTwo' component={WelcomeStepperStepTwo} />
      <WelcomeStepperNavigator.Screen
        name='StepThree'
        component={WelcomeStepperStepThree}
      />
    </WelcomeStepperNavigator.Navigator>
  );
};
