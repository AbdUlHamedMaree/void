import { useAppTheme } from '$theme/hook';
import React from 'react';
import type { IconProps } from 'react-native-vector-icons/Icon';
import CoreMaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const MaterialCommunityIcon: React.FC<IconProps> = props => {
  const theme = useAppTheme();

  return <CoreMaterialCommunityIcon color={theme.colors.text} {...props} />;
};
