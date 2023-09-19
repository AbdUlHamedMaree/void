import { PaperToastContainer } from '$modules/react-native-paper-toast';
import { commonStyles } from '$styles/common';
import { forwardRef, memo } from 'react';
import { SafeAreaView, SafeAreaProviderProps } from 'react-native-safe-area-context';

export type ScreenWrapperProps = {
  children?: React.ReactNode;
  disablePadding?: boolean;
  center?: boolean;
  verticalCenter?: boolean;
  horizontalCenter?: boolean;
} & SafeAreaProviderProps;

export const ScreenWrapper = memo(
  forwardRef<React.ComponentRef<typeof SafeAreaView>, ScreenWrapperProps>(
    function ScreenWrapper(
      { children, disablePadding, center, verticalCenter, horizontalCenter, ...props },
      forwardRef
    ) {
      return (
        <SafeAreaView
          {...props}
          ref={forwardRef}
          style={[
            !disablePadding && commonStyles.screenPadding,
            center && commonStyles.flexCenter,
            verticalCenter && commonStyles.justifyCenter,
            horizontalCenter && commonStyles.itemsCenter,
            props.style,
          ]}
        >
          {children}
          <PaperToastContainer />
        </SafeAreaView>
      );
    }
  )
);
