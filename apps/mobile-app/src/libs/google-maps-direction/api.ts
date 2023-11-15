import { GOOGLE_SERVICES_API } from '@env';
import axios, { AxiosRequestConfig } from 'axios';
import { BoundingBox, LatLng } from 'react-native-maps';

export type TextValueObject = {
  text: string;
  value: number;
};

export type TimeZoneTextValueObject = TextValueObject & {
  time_zone: string;
};

export type GetGoogleMapsDirectionsArg = {
  origin: LatLng;
  destination: LatLng;

  alternatives?: boolean;
  departureTime?: number;
  arrivalTime?: number;
  avoid?: 'tolls' | 'highways' | 'ferries' | 'indoor';
  language?: string;
  mode?: 'driving' | 'bicycling' | 'transit' | 'walking';
  region?: string;
  trafficModel?: 'best_guess' | 'pessimistic' | 'optimistic';
  transitMode?: 'bus' | 'subway' | 'train' | 'tram' | 'rail';
  transitRoutingPreference?: 'less_walking' | 'fewer_transfers';
  units?: 'metric' | 'imperial';
  waypoints?: LatLng[];

  optimizeWaypoints?: boolean;
};

export type DirectionsStep = {
  duration: TextValueObject;
  end_location: LatLng;
  html_instructions: string;
  polyline: any;
  start_location: LatLng;
  travel_mode: any;
  distance?: TextValueObject;
  maneuver?: string;
  steps?: any;
  transit_details?: any;
};

export type DirectionsLeg = {
  end_address: string;
  end_location: LatLng;
  start_address: string;
  start_location: LatLng;
  steps: DirectionsStep[];
  via_waypoint: any[];
  arrival_time?: TimeZoneTextValueObject;
  departure_time?: TimeZoneTextValueObject;
  distance?: TextValueObject;
  duration?: TextValueObject;
  duration_in_traffic: TextValueObject;
};

export type GoogleMapsDirectionsResponseRoutes = {
  bounds: BoundingBox;
  copyrights: string;
  legs: DirectionsLeg[];
  overview_polyline: any;
  summary: string;
  warnings: string[];
  waypoint_order: number[];
  fare?: any;
};

export type GetGoogleMapsDirectionsResponseBody = {
  routes: GoogleMapsDirectionsResponseRoutes[];
  status:
    | 'OK'
    | 'NOT_FOUND'
    | 'ZERO_RESULTS'
    | 'MAX_WAYPOINTS_EXCEEDED'
    | 'MAX_ROUTE_LENGTH_EXCEEDED'
    | 'INVALID_REQUEST'
    | 'OVER_DAILY_LIMIT'
    | 'OVER_QUERY_LIMIT'
    | 'REQUEST_DENIED'
    | 'UNKNOWN_ERROR';
  available_travel_modes?: any[];
  error_message?: string;
  geocoded_waypoints?: any[];
};

export const getGoogleMapsDirections = (
  {
    origin,
    destination,

    alternatives,
    departureTime,
    arrivalTime,
    avoid,
    language = 'en',
    mode = 'driving',
    region,
    trafficModel,
    transitMode,
    transitRoutingPreference,
    units,
    waypoints,

    optimizeWaypoints,
  }: GetGoogleMapsDirectionsArg,
  config?: AxiosRequestConfig
) => {
  const stringifiedWaypoints = waypoints?.map(getLatLngString).join('|');

  return axios.get<GetGoogleMapsDirectionsResponseBody>(
    'https://maps.googleapis.com/maps/api/directions/json',
    {
      ...config,
      params: {
        key: GOOGLE_SERVICES_API,

        origin: getLatLngString(origin),
        destination: getLatLngString(destination),

        alternatives,
        departureTime,
        arrivalTime,
        avoid,
        language,
        mode,
        region,

        trafficModel,
        transitMode,
        transitRoutingPreference,
        units,

        waypoints:
          optimizeWaypoints && stringifiedWaypoints
            ? `optimize:true|${stringifiedWaypoints}`
            : stringifiedWaypoints,

        ...config?.params,
      },
    }
  );
};

const getLatLngString = ({ latitude, longitude }: LatLng) => `${latitude},${longitude}`;
