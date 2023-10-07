import { createGraphQLCRUDEntity } from '$libs/graphql-react-query/create-graphql-crud-entity';
import { createTripDocument } from './mutations/create-trip';
import { joinTripDocument } from './mutations/join-trip';
import { mapTripsDocument } from './queries/map-trips';
import { tripsDocument } from './queries/trips';

export const {
  queries: [useTripsQuery, useMapTripsQuery],
  mutations: [useJoinTripMutation, useCreateTripMutation],
} = createGraphQLCRUDEntity(tripsDocument, mapTripsDocument)(
  joinTripDocument,
  createTripDocument
);
