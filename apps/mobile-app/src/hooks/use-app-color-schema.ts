import { colorSchemaAtom } from '$atoms/color-schema';
import { useAtomValue } from 'jotai/react';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

export const useAppColorSchema = () => {
  const colorSchema = useAtomValue(colorSchemaAtom);
  const deviceColorSchema = useColorScheme();

  return useMemo<'light' | 'dark'>(() => {
    if (colorSchema === 'system') return deviceColorSchema ?? 'light';
    return colorSchema;
  }, [colorSchema, deviceColorSchema]);
};
