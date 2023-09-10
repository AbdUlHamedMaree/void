import { Text } from '$theme';

export type WelcomeStepperStepTwoProps = {
  children?: React.ReactNode;
};

export const WelcomeStepperStepTwo: React.FC<WelcomeStepperStepTwoProps> = () => {
  return <Text variant='Body1'>Step Two</Text>;
};
