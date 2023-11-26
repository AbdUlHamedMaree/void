import { useMemo } from 'react';
import {
  UseCheckIsUserInTripTripModel,
  useCheckIsUserInTrip,
} from './use-check-is-user-in-trip';

export const useIsUserPartOfTheTrip = (trip?: UseCheckIsUserInTripTripModel) => {
  const checkIsUserInTrip = useCheckIsUserInTrip();

  return useMemo(() => checkIsUserInTrip(trip), [checkIsUserInTrip, trip]);
};
