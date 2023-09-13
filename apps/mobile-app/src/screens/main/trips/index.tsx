import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export type MainTripsScreenProps = {
  //
};

export const MainTripsScreen: React.FC<MainTripsScreenProps> = () => {
  return (
    <SafeAreaView>
      <Text>Trips</Text>
    </SafeAreaView>
  );
};
