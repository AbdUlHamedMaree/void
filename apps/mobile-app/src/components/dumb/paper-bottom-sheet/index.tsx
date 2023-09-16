import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';
import { forwardRef, memo } from 'react';
import { useTheme } from 'react-native-paper';

export type PaperBottomSheetProps = BottomSheetProps;

export const PaperBottomSheet = memo(
  forwardRef<BottomSheet, PaperBottomSheetProps>(function PaperBottomSheet(props, ref) {
    const theme = useTheme();
    return (
      <BottomSheet
        {...props}
        ref={ref}
        backgroundStyle={{
          backgroundColor: theme.colors.elevation.level1,
        }}
      />
    );
  })
);
