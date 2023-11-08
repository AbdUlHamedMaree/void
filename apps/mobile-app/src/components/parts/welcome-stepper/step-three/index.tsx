import { commonStyles } from '$styles/common';
import LottieView from 'lottie-react-native';
import { View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';

export type WelcomeStepperStepThreeProps = {
  children?: React.ReactNode;
};

export const WelcomeStepperStepThree: React.FC<WelcomeStepperStepThreeProps> = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={[commonStyles.flexFull, commonStyles.flexCenter]}>
      <LottieView
        source={require('$assets/time-and-money.lottie')}
        autoPlay
        loop
        style={{ height: width, width: '100%' }}
      />
      <Text variant='headlineSmall'>Save money and time!</Text>
      <Text variant='bodyLarge'>
        by sharing taxis with others or driving them on your way!
      </Text>
    </View>
  );
};
