import { Trip, TripProps } from '$components/dumb/trip';
import { commonStyles } from '$styles/common';
import { spacing } from '$theme/spacing';
import { useNavigation } from '@react-navigation/native';
import { View, VirtualizedList } from 'react-native';
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

let id = 0;
export type MainTripsScreenProps = {
  //
};

export const MainTripsScreen: React.FC<MainTripsScreenProps> = () => {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={[commonStyles.flexFull]}>
      <VirtualizedList<TripProps & { key: string }>
        renderItem={item => <Trip {...item.item} />}
        keyExtractor={item => item.key}
        getItemCount={() => 20}
        getItem={() => ({
          key: '' + id++,
          source: 'City center Al-Zahiah, Al-Zahiah, Sharjah',
          dest: 'Dubai Mall, Burj Khalifah, Dubai',
          time: new Date(),
          emptySeatsCount: 3,
        })}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ItemSeparatorComponent={<View style={{ marginVertical: spacing.md }} />}
      />
      <FAB
        icon='plus'
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => navigate('CreateNewTrip')}
      />
    </SafeAreaView>
  );
};
