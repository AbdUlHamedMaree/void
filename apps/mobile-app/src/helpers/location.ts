import SphericalMercator from '@mapbox/sphericalmercator';
import { ScaledSize } from 'react-native';
import { Region } from 'react-native-maps';

const merc = new SphericalMercator();

export type Viewport = Pick<ScaledSize, 'width' | 'height'>;

export const getZoomLevelFromRegion = (region: Region, viewport: Viewport) => {
  const { longitudeDelta } = region;
  const { width } = viewport;

  // Normalize longitudeDelta which can assume negative values near central meridian
  const lngD = (360 + longitudeDelta) % 360;

  // Calculate the number of tiles currently visible in the viewport
  const tiles = width / 256;

  // Calculate the currently visible portion of the globe
  const portion = lngD / 360;

  // Calculate the portion of the globe taken up by each tile
  const tilePortion = portion / tiles;

  // Return the zoom level which splits the globe into that number of tiles
  return Math.log2(1 / tilePortion);
};

export const getRegionBoundaries = (center: Region, viewport: Viewport) => {
  const zoomLevel = getZoomLevelFromRegion(center, viewport);

  const { latitude, longitude } = center;
  const { width, height } = viewport;

  const [x, y] = merc.px([longitude, latitude], zoomLevel);
  const xmin = Math.floor(x - width / 2);
  const xmax = xmin + width;
  const ymin = Math.floor(y - height / 2);
  const ymax = ymin + height;

  const [westLongitude, northLatitude] = merc.ll([xmin, ymin], zoomLevel);
  const [eastLongitude, southLatitude] = merc.ll([xmax, ymax], zoomLevel);

  return {
    northLatitude,
    southLatitude,
    westLongitude,
    eastLongitude,
  };
};
