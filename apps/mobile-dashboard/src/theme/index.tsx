import React, {ReactNode} from 'react';
import {
  createBox,
  createText,
  useTheme as useReTheme,
  ThemeProvider as RestyleThemeProvier,
} from '@shopify/restyle';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

import {darkColors, lightColors} from './colors';
import {spacing} from './spacing';
import {borderRadiuses} from './border-radius';
import {variants} from './variants';

const getTheme = (darkTheme?: boolean) => ({
  colors: {
    ...(darkTheme ? darkColors : lightColors),
  },
  spacing: {
    ...spacing,
  },
  borderRadii: {
    ...borderRadiuses,
  },
  textVariants: {
    ...variants,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export const ThemeProvider = ({
  children,
  dark,
}: {
  children: ReactNode;
  dark?: boolean;
}) => <RestyleThemeProvier theme={getTheme(dark)}>{children}</RestyleThemeProvier>;

export type Theme = ReturnType<typeof getTheme>;

export const Box = createBox<Theme>();
export const BaseText = createText<Theme>();
export const useTheme = () => useReTheme<Theme>();

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};
export const makeStyles =
  <T extends NamedStyles<T>>(styles: (theme: Theme) => T) =>
  () => {
    const currentTheme = useTheme();
    return styles(currentTheme);
  };
