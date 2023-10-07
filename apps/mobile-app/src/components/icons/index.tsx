import { useAppTheme } from '$theme/hook';
import React from 'react';
import CoreMaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const MaterialCommunityIcon: React.FC<
  React.ComponentProps<typeof CoreMaterialCommunityIcon>
> = props => {
  const theme = useAppTheme();

  return <CoreMaterialCommunityIcon color={theme.colors.text} {...props} />;
};
