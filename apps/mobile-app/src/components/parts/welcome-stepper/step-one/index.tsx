import { commonStyles } from '$styles/common';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';

export type WelcomeStepperStepOneProps = {
  children?: React.ReactNode;
};

export const WelcomeStepperStepOne: React.FC<WelcomeStepperStepOneProps> = () => {
  return (
    <View style={[commonStyles.flexFull, commonStyles.flexCenter]}>
      <Image
        source={require('$assets/people-talking@2.png')}
        style={{ width: '90%', objectFit: 'contain' }}
      />
      <Text variant='headlineSmall'>Find people going to the same destination</Text>
      <Text variant='bodyLarge'>and share one taxi!</Text>
    </View>
  );
};
