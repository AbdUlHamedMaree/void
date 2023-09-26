import { Path } from 'react-hook-form';

export const createKeyGetter =
  <T>() =>
  <K extends Path<T>>(k: K) =>
    k;
