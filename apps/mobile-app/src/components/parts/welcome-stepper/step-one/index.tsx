import { commonStyles } from '$styles/common';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export type WelcomeStepperStepOneProps = {
  children?: React.ReactNode;
};

export const WelcomeStepperStepOne: React.FC<WelcomeStepperStepOneProps> = () => {
  return (
    <View style={[commonStyles.flexFull, commonStyles.flexCenter]}>
      <Text>Step One</Text>
    </View>
  );
};
