import { spacing } from '$theme/spacing';
import { StyleSheet } from 'react-native';

export const screenHorizontalPadding = spacing.md + spacing.sm;
export const screenVerticalPadding = spacing.lg;

export const commonStyles = StyleSheet.create({
  flexFull: {
    flex: 1,
  },
  screenPadding: {
    paddingHorizontal: screenHorizontalPadding,
    paddingVertical: screenVerticalPadding,
  },
  screenHorizontalPadding: {
    paddingHorizontal: screenHorizontalPadding,
  },
  screenVerticalPadding: {
    paddingVertical: screenVerticalPadding,
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
