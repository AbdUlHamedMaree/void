import { useAppColorSchema } from '$hooks/use-app-color-schema';
import { getPaperTheme } from './theme';

export const usePaperTheme = () => {
  const colorSchema = useAppColorSchema();

  return getPaperTheme(colorSchema === 'dark');
};
