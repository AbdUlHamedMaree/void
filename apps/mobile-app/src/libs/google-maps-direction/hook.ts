import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  GetGoogleMapsDirectionsArg,
  GetGoogleMapsDirectionsResponseBody,
  getGoogleMapsDirections,
} from './api';
import { AxiosError, AxiosResponse } from 'axios';

export const useGoogleMapsDirectionsQuery = (
  arg: GetGoogleMapsDirectionsArg,
  queryConfig?: UseQueryOptions<
    AxiosResponse<GetGoogleMapsDirectionsResponseBody>,
    AxiosError,
    AxiosResponse<GetGoogleMapsDirectionsResponseBody>,
    [GetGoogleMapsDirectionsArg]
  >
) =>
  useQuery<
    AxiosResponse<GetGoogleMapsDirectionsResponseBody>,
    AxiosError,
    AxiosResponse<GetGoogleMapsDirectionsResponseBody>,
    [GetGoogleMapsDirectionsArg]
  >({
    ...queryConfig,
    queryKey: [arg],
    queryFn: ({ queryKey, signal }) => getGoogleMapsDirections(queryKey[0], { signal }),
  });

export const useGoogleMapsDirectionsMutation = (
  mutationConfig: UseMutationOptions<
    AxiosResponse<GetGoogleMapsDirectionsResponseBody>,
    AxiosError,
    GetGoogleMapsDirectionsArg,
    unknown
  >
) =>
  useMutation<
    AxiosResponse<GetGoogleMapsDirectionsResponseBody>,
    AxiosError,
    GetGoogleMapsDirectionsArg,
    unknown
  >({
    ...mutationConfig,
    mutationFn: arg => getGoogleMapsDirections(arg),
  });
