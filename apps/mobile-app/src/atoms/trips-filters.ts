import { atom } from 'jotai';

export type TripsFiltersModel = {
  pickup?: {
    country: string;
    city: string;
    area: string;
  };
  dropoff?: {
    country: string;
    city: string;
    area: string;
  };
  fromAt?: Date;
  toAt?: Date;
  minAvailableSeats?: number;
};

export const tripsFiltersAtom = atom<undefined | TripsFiltersModel>(undefined);
