import { Text } from '$theme';

export type WelcomeStepperStepThreeProps = {
  children?: React.ReactNode;
};

export const WelcomeStepperStepThree: React.FC<WelcomeStepperStepThreeProps> = () => {
  return <Text variant='Body1'>Step Three</Text>;
};
