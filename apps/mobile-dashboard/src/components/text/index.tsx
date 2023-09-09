import React from 'react';
import {StyleProp, TextStyle} from 'react-native';

import {BaseText, Theme} from '$theme';
import {strings} from '$core';

interface Props {
  variant?: keyof Theme['textVariants'];
  color?: keyof Theme['colors'];
  tx?: string;
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export const Text: React.FC<Props> = ({tx, children, variant, color, style}) => {
  const content = tx ? strings(tx) : children;

  return (
    <BaseText variant={variant} color={color} style={style}>
      {content}
    </BaseText>
  );
};
