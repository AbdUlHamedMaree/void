import { produce } from 'immer';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Snackbar } from 'react-native-paper';
import {
  SnackbarModel,
  SnackbarTypeUnion,
  SnackbarVariantUnion,
  ToastOptionsWithoutMessageModel,
} from './model';
import { EmitterApi } from './event-emitter';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { useAppTheme } from '$theme/hook';
import { StyleProp, ViewStyle } from 'react-native';
import merge from 'deepmerge';
import { RequiredKeys } from '$types/required-keys';

type SnackbarVariantTypeValue<T> = Record<
  SnackbarVariantUnion,
  Record<SnackbarTypeUnion, T>
>;

const defaultTypeValue: SnackbarVariantTypeValue<undefined>[SnackbarVariantUnion] = {
  default: undefined,
  success: undefined,
  info: undefined,
  warning: undefined,
  error: undefined,
};

type ToastFinalOptionsWithoutMessageModel = RequiredKeys<
  ToastOptionsWithoutMessageModel,
  'duration' | 'variant' | 'type'
>;

const defaultSnackbarOptions: ToastFinalOptionsWithoutMessageModel = {
  duration: 4000,
  variant: 'contained',
  type: 'default',
};

export type PaperToastContainerProps = {
  children?: React.ReactNode;
} & ToastOptionsWithoutMessageModel;

export const PaperToastContainer: React.FC<PaperToastContainerProps> = memo(
  ({ children, ...baseOptions }) => {
    const theme = useAppTheme();

    const [snackbars, setSnackbars] = useState<Record<string, SnackbarModel>>({});

    useEffect(() => {
      const key = Date.now();

      EmitterApi.onSnackbar.push([
        (newSnackbar: SnackbarModel) => {
          setSnackbars(v => ({ ...v, [newSnackbar.id]: newSnackbar }));

          setImmediate(() =>
            setSnackbars(
              produce(draft => {
                const snackbar = draft[newSnackbar.id];
                if (snackbar) snackbar.visible = true;
              })
            )
          );
        },
        key,
      ]);

      return () => {
        const i = EmitterApi.onSnackbar.findIndex(e => e[1] === key);
        if (i === -1) return;

        EmitterApi.onSnackbar.splice(i, 1);
      };
    }, []);

    const onDismiss = useCallback((id: string) => {
      setSnackbars(
        produce(draft => {
          const snackbar = draft[id];
          if (snackbar) snackbar.visible = false;
        })
      );
      setTimeout(() => {
        setSnackbars(
          produce(draft => {
            delete draft[id];
          })
        );
      }, 50);
    }, []);

    const snackbarThemes = useMemo<SnackbarVariantTypeValue<ThemeProp | undefined>>(
      () => ({
        outlined: defaultTypeValue,
        contained: {
          default: undefined,
          success: {
            colors: {
              inverseOnSurface: theme.colors.success,
              inverseSurface: theme.colors.successContainer,
            },
          },
          info: {
            colors: {
              inverseOnSurface: theme.colors.info,
              inverseSurface: theme.colors.infoContainer,
            },
          },
          warning: {
            colors: {
              inverseOnSurface: theme.colors.warning,
              inverseSurface: theme.colors.warningContainer,
            },
          },
          error: {
            colors: {
              inverseOnSurface: theme.colors.error,
              inverseSurface: theme.colors.errorContainer,
            },
          },
        },
      }),
      [
        theme.colors.error,
        theme.colors.errorContainer,
        theme.colors.info,
        theme.colors.infoContainer,
        theme.colors.success,
        theme.colors.successContainer,
        theme.colors.warning,
        theme.colors.warningContainer,
      ]
    );

    const snackbarStyles = useMemo<
      SnackbarVariantTypeValue<StyleProp<ViewStyle> | undefined>
    >(
      () => ({
        contained: defaultTypeValue,
        outlined: {
          default: undefined,
          success: {
            borderColor: theme.colors.success,
            borderWidth: 1,
          },
          info: {
            borderColor: theme.colors.info,
            borderWidth: 1,
          },
          warning: {
            borderColor: theme.colors.warning,
            borderWidth: 1,
          },
          error: {
            borderColor: theme.colors.error,
            borderWidth: 1,
          },
        },
      }),
      [theme.colors.error, theme.colors.info, theme.colors.success, theme.colors.warning]
    );

    const snackbarsJsx = useMemo(
      () =>
        Object.values(snackbars).map(snackbar => {
          const options = merge.all<ToastFinalOptionsWithoutMessageModel>([
            defaultSnackbarOptions,
            baseOptions,
            snackbar,
          ]);
          return (
            <Snackbar
              {...options}
              key={snackbar.id}
              id={snackbar.id}
              visible={snackbar.visible}
              action={options.action}
              theme={snackbarThemes[options.variant][options.type]}
              style={snackbarStyles[options.variant][options.type]}
              onDismiss={() => {
                onDismiss(snackbar.id);
                snackbar.onDismiss?.();
              }}
            >
              {snackbar.message}
            </Snackbar>
          );
        }),
      [baseOptions, onDismiss, snackbarStyles, snackbarThemes, snackbars]
    );

    return (
      <>
        {children}
        {snackbarsJsx}
      </>
    );
  }
);
