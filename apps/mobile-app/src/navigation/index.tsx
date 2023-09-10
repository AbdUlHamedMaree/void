import React from 'react';
import { WelcomeStepperNavigator } from './navigator';
import { WelcomeStepperStack } from './welcome-stepper';

export const RootStack: React.FC = () => {
  return (
    <WelcomeStepperNavigator.Navigator>
      <WelcomeStepperNavigator.Screen
        name='WelcomeStepper'
        component={WelcomeStepperStack}
      />
    </WelcomeStepperNavigator.Navigator>
  );
};
