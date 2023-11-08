import { useViewWidth } from '$hooks/use-view-width';
import { commonStyles } from '$styles/common';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export type LoadingSectionProps = {
  loading?: boolean;
  error?: boolean;
  empty?: boolean;
  children?: React.ReactNode;
};

export const LoadingSection: React.FC<LoadingSectionProps> = ({
  loading,
  error,
  empty,
  children,
}) => {
  const viewWidth = useViewWidth();

  if (loading)
    return (
      <View
        ref={viewWidth.ref}
        onLayout={viewWidth.measureWidth}
        style={[
          commonStyles.flexFull,
          commonStyles.justifyCenter,
          commonStyles.itemsCenter,
        ]}
      >
        <LottieView
          source={require('$assets/loading.lottie')}
          autoPlay
          loop
          style={{ height: viewWidth.width, width: '100%' }}
        />
      </View>
    );

  if (error)
    return (
      <View
        style={[
          commonStyles.flexFull,
          commonStyles.justifyCenter,
          commonStyles.itemsCenter,
        ]}
      >
        <Text variant='displayMedium'>Error</Text>
      </View>
    );

  if (empty)
    return (
      <View
        style={[
          commonStyles.flexFull,
          commonStyles.justifyCenter,
          commonStyles.itemsCenter,
        ]}
      >
        <Text variant='displayMedium'>Empty</Text>
      </View>
    );

  return <>{children}</>;
};
