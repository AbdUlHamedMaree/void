import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';

export type WelcomeStepperStepOneProps = {
  children?: React.ReactNode;
};

export const WelcomeStepperStepOne: React.FC<WelcomeStepperStepOneProps> = () => {
  const { navigate } = useNavigation();

  return (
    <Button
      title='click'
      onPress={() =>
        navigate('WelcomeStepper', {
          screen: 'StepTwo',
        })
      }
    />
  );
};
