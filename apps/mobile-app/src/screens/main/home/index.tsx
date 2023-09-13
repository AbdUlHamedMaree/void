import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import { commonStyles } from '$styles/common';
import { useAtom } from 'jotai/react';
import { mapRegionAtom } from '$atoms/map-region';

export type MainHomeScreenProps = {
  //
};

export const MainHomeScreen: React.FC<MainHomeScreenProps> = () => {
  const [mapRegion, setMapRegion] = useAtom(mapRegionAtom);

  return (
    <SafeAreaView style={commonStyles.flexFull}>
      <MapView
        style={commonStyles.flexFull}
        initialRegion={mapRegion}
        onRegionChange={setMapRegion}
      />
    </SafeAreaView>
  );
};
