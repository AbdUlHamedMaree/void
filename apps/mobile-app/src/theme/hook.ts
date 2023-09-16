import { useAppColorSchema } from '$hooks/use-app-color-schema';
import { useMemo } from 'react';
import { getPaperTheme } from './theme';

export const usePaperTheme = () => {
  const colorSchema = useAppColorSchema();

  return useMemo(() => getPaperTheme(colorSchema === 'dark'), [colorSchema]);
};
