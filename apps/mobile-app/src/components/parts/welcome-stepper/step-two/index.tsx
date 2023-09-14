import { commonStyles } from '$styles/common';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';

export type WelcomeStepperStepTwoProps = {
  children?: React.ReactNode;
};

export const WelcomeStepperStepTwo: React.FC<WelcomeStepperStepTwoProps> = () => {
  return (
    <View style={[commonStyles.flexFull, commonStyles.flexCenter]}>
      <Image
        source={require('$assets/driver-texting@2.png')}
        style={{ width: '90%', objectFit: 'contain' }}
      />
      <Text variant='headlineSmall'>Pick people while going to your destination</Text>
      <Text variant='bodyLarge'>and take money from them!</Text>
    </View>
  );
};
