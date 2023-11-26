import { useMeQuery } from '$apis/user';
import { graphql } from '$gql';
import { FragmentModel } from '$types/fragment-model';
import { useCallback } from 'react';

const Trip = graphql(`
  fragment UseIsUserPartOfTheTrip on TripOt {
    driverId

    passengers {
      id
    }
  }
`);

export type UseCheckIsUserInTripTripModel = FragmentModel<typeof Trip>;

export const useCheckIsUserInTrip = () => {
  const meQuery = useMeQuery();
  const user = meQuery.data?.me;

  return useCallback(
    (trip?: UseCheckIsUserInTripTripModel) => {
      if (!user || !trip) return false;

      if (trip?.driverId === user.id) return true;

      if (trip?.passengers?.some(passenger => passenger.id === user.id)) return true;

      return false;
    },
    [user]
  );
};
