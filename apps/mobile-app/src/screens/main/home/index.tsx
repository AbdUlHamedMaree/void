import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Polyline } from 'react-native-maps';
import { commonStyles } from '$styles/common';
import { useAtom } from 'jotai/react';
import { mapRegionAtom } from '$atoms/map-region';
import { useAppColorSchema } from '$hooks/use-app-color-schema';

export type MainHomeScreenProps = {
  //
};

export const MainHomeScreen: React.FC<MainHomeScreenProps> = () => {
  const [mapRegion, setMapRegion] = useAtom(mapRegionAtom);
  const colorSchema = useAppColorSchema();

  return (
    <SafeAreaView style={commonStyles.flexFull}>
      <MapView
        style={commonStyles.flexFull}
        initialRegion={mapRegion}
        userInterfaceStyle={colorSchema}
        onRegionChange={setMapRegion}
        onPress={e => {
          console.log(e.nativeEvent.coordinate);
        }}
      >
        <Polyline
          strokeWidth={3}
          coordinates={[
            { latitude: 25.23051156268411, longitude: 55.28713256120682 },
            { latitude: 25.230129112325294, longitude: 55.288368724286556 },
            { latitude: 25.229473696978292, longitude: 55.28831776231527 },
            { latitude: 25.22115013039745, longitude: 55.2817527204752 },
            { latitude: 25.216101967544464, longitude: 55.278230644762516 },
            { latitude: 25.2137757322375, longitude: 55.27610331773758 },
          ]}
        />
      </MapView>
    </SafeAreaView>
  );
};
