import { Trip, TripProps } from '$components/dumb/trip';
import { commonStyles } from '$styles/common';
import { spacing } from '$theme/spacing';
import { View, VirtualizedList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

let id = 0;
export type MainTripsScreenProps = {
  //
};

export const MainTripsScreen: React.FC<MainTripsScreenProps> = () => {
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
    </SafeAreaView>
  );
};
