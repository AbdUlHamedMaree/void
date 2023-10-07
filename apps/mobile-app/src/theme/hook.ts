import { useAppColorSchema } from '$hooks/use-app-color-schema';
import { useMemo } from 'react';
import { AppTheme, getPaperTheme } from './theme';
import { useTheme } from 'react-native-paper';
import { DeepPartial } from 'react-hook-form';

export const usePaperTheme = () => {
  const colorSchema = useAppColorSchema();

  return useMemo(() => getPaperTheme(colorSchema === 'dark'), [colorSchema]);
};

export const useAppTheme = (overrides?: DeepPartial<AppTheme>) =>
  useTheme<AppTheme>(overrides);
