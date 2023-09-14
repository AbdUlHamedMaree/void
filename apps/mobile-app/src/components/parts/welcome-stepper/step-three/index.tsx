import { commonStyles } from '$styles/common';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';

export type WelcomeStepperStepThreeProps = {
  children?: React.ReactNode;
};

export const WelcomeStepperStepThree: React.FC<WelcomeStepperStepThreeProps> = () => {
  return (
    <View style={[commonStyles.flexFull, commonStyles.flexCenter]}>
      <Image
        source={require('$assets/save-money-time@2.png')}
        style={{ width: '90%', objectFit: 'contain' }}
      />
      <Text variant='headlineSmall'>Save money and time!</Text>
      <Text variant='bodyLarge'>
        by sharing taxis with others or driving them on your way!
      </Text>
    </View>
  );
};
