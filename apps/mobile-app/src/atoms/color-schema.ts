import { atomWithMMKV } from '$libs/jotai/atom-with-mmkv';

export enum ColorSchemaEnum {
  system = 'system',
  light = 'light',
  dark = 'dark',
}

export type ColorSchemaUnion = keyof typeof ColorSchemaEnum;

export const colorSchemaAtom = atomWithMMKV<ColorSchemaUnion>('color-schema', 'system');
