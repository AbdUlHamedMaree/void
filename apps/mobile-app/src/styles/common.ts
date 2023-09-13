import { spacing } from '$theme/spacing';
import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  flexFull: {
    flex: 1,
  },
  screenPadding: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCenter: {
    justifyContent: 'center',
  },
  itemsCenter: {
    alignItems: 'center',
  },
});
