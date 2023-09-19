import { spacing } from '$theme/spacing';
import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  flexFull: {
    flex: 1,
  },
  screenPadding: {
    paddingHorizontal: spacing.md + spacing.sm,
    paddingVertical: spacing.lg,
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
});
