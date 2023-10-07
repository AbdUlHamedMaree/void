import { useAppTheme } from '$theme/hook';
import { shadowsStyles } from '$theme/shadows';
import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';
import { forwardRef, memo } from 'react';

export type PaperBottomSheetProps = BottomSheetProps;

export const PaperBottomSheet = memo(
  forwardRef<BottomSheet, PaperBottomSheetProps>(function PaperBottomSheet(props, ref) {
    const theme = useAppTheme();

    if (theme.dark) {
      return (
        <BottomSheet
          {...props}
          ref={ref}
          backgroundStyle={{
            backgroundColor: theme.colors.elevation.level1,
          }}
          handleIndicatorStyle={{
            backgroundColor: theme.colors.outline,
          }}
        />
      );
    }

    return (
      <BottomSheet
        {...props}
        ref={ref}
        backgroundStyle={{
          backgroundColor: theme.colors.background,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.outlineVariant,
        }}
        style={shadowsStyles[4]}
      />
    );
  })
);
