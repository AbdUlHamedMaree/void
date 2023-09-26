import { commonStyles } from '$styles/common';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

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
  if (loading)
    return (
      <View
        style={[
          commonStyles.flexFull,
          commonStyles.justifyCenter,
          commonStyles.itemsCenter,
        ]}
      >
        <ActivityIndicator animating />
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
