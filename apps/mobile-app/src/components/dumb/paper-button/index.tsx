import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';
import React, { forwardRef, memo, useMemo } from 'react';
import { Button, ButtonProps, Text, TextProps } from 'react-native-paper';

export type PaperButtonSizeUnion = 'small' | 'medium' | 'large';

export type PaperButtonRadiusUnion = 'full' | 'basic' | 'none';

export type PaperButtonProps = {
  size?: PaperButtonSizeUnion;
  radius?: PaperButtonRadiusUnion;
  textProps?: TextProps<never>;
} & ButtonProps;

export const PaperButton = memo(
  forwardRef<React.ComponentRef<typeof Button>, PaperButtonProps>(function PaperButton(
    {
      size = 'medium',
      radius = 'basic',
      mode = 'contained',
      textProps,
      children,
      ...props
    },
    ref
  ) {
    const theme = useAppTheme();

    const borderRadius = useMemo(() => {
      switch (radius) {
        case 'basic':
          return theme.roundness;
        case 'none':
          return 0;
        case 'full':
        default:
          return undefined;
      }
    }, [radius, theme.roundness]);

    const padding = useMemo(() => {
      switch (size) {
        case 'large':
          return spacing.md;
        case 'medium':
          return spacing.sm;
        case 'small':
        default:
          return undefined;
      }
    }, [size]);

    const textVariant = useMemo(() => {
      switch (size) {
        case 'large':
        case 'medium':
          return 'bodyLarge';
        case 'small':
        default:
          return undefined;
      }
    }, [size]);

    const textColorVariant = useMemo(() => {
      switch (mode) {
        case 'contained':
          return theme.colors.onPrimary;
        case 'contained-tonal':
          return theme.colors.onSecondaryContainer;
        case 'elevated':
          return theme.colors.secondary;
        case 'outlined':
          return theme.colors.primary;
        case 'text':
          return theme.colors.primary;
        default:
          return undefined;
      }
    }, [
      mode,
      theme.colors.onPrimary,
      theme.colors.onSecondaryContainer,
      theme.colors.primary,
      theme.colors.secondary,
    ]);

    return (
      <Button
        mode={mode}
        {...props}
        ref={ref}
        style={[
          {
            borderRadius: borderRadius,
            padding: padding,
          },
          props.style,
        ]}
      >
        <Text
          variant={textVariant}
          {...textProps}
          style={[{ color: textColorVariant }, textProps?.style]}
        >
          {children}
        </Text>
      </Button>
    );
  })
);
