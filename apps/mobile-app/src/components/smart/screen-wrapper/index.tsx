import { PaperToastContainer } from '$modules/react-native-paper-toast';
import { commonStyles } from '$styles/common';
import { forwardRef, memo } from 'react';
import { SafeAreaView, SafeAreaProviderProps } from 'react-native-safe-area-context';

export type ScreenWrapperProps = {
  disablePadding?: boolean;
  disableFlexFull?: boolean;

  center?: boolean;
  verticalCenter?: boolean;
  horizontalCenter?: boolean;

  children?: React.ReactNode;
} & SafeAreaProviderProps;

export const ScreenWrapper = memo(
  forwardRef<React.ComponentRef<typeof SafeAreaView>, ScreenWrapperProps>(
    function ScreenWrapper(
      {
        children,
        disablePadding,
        disableFlexFull,
        center,
        verticalCenter,
        horizontalCenter,
        ...props
      },
      forwardRef
    ) {
      return (
        <SafeAreaView
          {...props}
          ref={forwardRef}
          style={[
            !disableFlexFull && commonStyles.flexFull,
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
