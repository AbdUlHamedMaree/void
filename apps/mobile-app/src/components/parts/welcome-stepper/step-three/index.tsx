import { commonStyles } from '$styles/common';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export type WelcomeStepperStepThreeProps = {
  children?: React.ReactNode;
};

export const WelcomeStepperStepThree: React.FC<WelcomeStepperStepThreeProps> = () => {
  return (
    <View style={[commonStyles.flexFull, commonStyles.flexCenter]}>
      <Text>Step Three</Text>
    </View>
  );
};
