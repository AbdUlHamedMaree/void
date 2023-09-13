import { useAppColorSchema } from '$hooks/use-app-color-schema';
import { usePaperTheme } from '$theme/hook';
import { StatusBar, StatusBarProps } from 'react-native';

export type AppStatusBarProps = StatusBarProps;

export const AppStatusBar: React.FC<AppStatusBarProps> = props => {
  const colorSchema = useAppColorSchema();
  const theme = usePaperTheme();
  const isDark = colorSchema === 'dark';

  const barStyle = isDark ? 'light-content' : 'dark-content';

  return (
    <StatusBar barStyle={barStyle} backgroundColor={theme.colors.background} {...props} />
  );
};
