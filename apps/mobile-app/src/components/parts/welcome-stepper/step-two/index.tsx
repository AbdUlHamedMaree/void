import { commonStyles } from '$styles/common';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export type WelcomeStepperStepTwoProps = {
  children?: React.ReactNode;
};

export const WelcomeStepperStepTwo: React.FC<WelcomeStepperStepTwoProps> = () => {
  return (
    <View style={[commonStyles.flexFull, commonStyles.flexCenter]}>
      <Text>Step Two</Text>
    </View>
  );
};
