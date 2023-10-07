import { MaterialCommunityIcon } from '$components/icons';
import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';
import { View } from 'react-native';
import { Card } from 'react-native-paper';

export type TripMapMarkerCardProps = {
  children?: React.ReactNode;
};

export const TripMapMarkerCard: React.FC<TripMapMarkerCardProps> = ({ children }) => {
  const theme = useAppTheme();

  return (
    <View>
      <Card style={{ padding: spacing.md }}>{children}</Card>
      <View style={{ alignItems: 'center' }}>
        <MaterialCommunityIcon
          name='triangle'
          style={{
            color: theme.colors.background,
            marginTop: -2,
            transform: [{ rotate: '180deg' }],
          }}
        />
      </View>
    </View>
  );
};
