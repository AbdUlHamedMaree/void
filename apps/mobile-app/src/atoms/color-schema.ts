import { atomWithStorage } from 'jotai/utils';

export enum ColorSchemaEnum {
  system = 'system',
  light = 'light',
  dark = 'dark',
}

export type ColorSchemaUnion = keyof typeof ColorSchemaEnum;

export const colorSchemaAtom = atomWithStorage<ColorSchemaUnion>(
  'color-schema',
  'system'
);
