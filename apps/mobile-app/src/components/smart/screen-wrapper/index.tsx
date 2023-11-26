import { PaperToastContainer, toast } from '$modules/react-native-paper-toast';
import { ToastOptionsModel } from '$modules/react-native-paper-toast/model';
import { commonStyles } from '$styles/common';
import { useRoute } from '@react-navigation/native';
import { forwardRef, memo, useEffect } from 'react';
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
      const { params } = useRoute();

      useEffect(() => {
        if (!params) return;
        if (!('toast' in params)) return;

        const toastOptions = params.toast as ToastOptionsModel;

        toast(toastOptions);
      }, [params]);

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
          <PaperToastContainer variant='contained' />
        </SafeAreaView>
      );
    }
  )
);
