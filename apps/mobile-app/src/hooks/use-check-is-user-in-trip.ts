import { useMeQuery } from '$apis/user';
import { graphql } from '$gql';
import { FragmentModel } from '$types/fragment-model';
import { useCallback } from 'react';

const Trip = graphql(`
  fragment TripPassengers on TripOt {
    passengers {
      id
    }
  }
`);

type TripModel = FragmentModel<typeof Trip>;

export const useCheckIsUserInTrip = () => {
  const meQuery = useMeQuery();
  const user = meQuery.data?.me;

  return useCallback(
    (trip: TripModel) => trip.passengers?.some(passenger => passenger.id === user?.id),
    [user?.id]
  );
};
