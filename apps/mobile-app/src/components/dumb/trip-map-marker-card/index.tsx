import { MaterialCommunityIcon } from '$components/icons';
import { View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

export type TripMapMarkerCardProps = {
  children?: React.ReactNode;
};

export const TripMapMarkerCard: React.FC<TripMapMarkerCardProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <View>
      <Card style={{ padding: 10 }}>{children}</Card>
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
