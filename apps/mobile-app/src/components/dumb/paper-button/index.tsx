import { spacing } from '$theme/spacing';
import React, { forwardRef, memo, useMemo } from 'react';
import { Button, ButtonProps, Text, TextProps, useTheme } from 'react-native-paper';

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
    const theme = useTheme();

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
          style={[{ color: theme.colors.onPrimary }, textProps?.style]}
        >
          {children}
        </Text>
      </Button>
    );
  })
);
