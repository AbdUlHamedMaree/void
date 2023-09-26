import { produce } from 'immer';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Snackbar, useTheme } from 'react-native-paper';
import { SnackbarModel, SnackbarTypeUnion, SnackbarVariantUnion } from './model';
import { EmitterApi } from './event-emitter';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

const defaultThemes: Record<SnackbarTypeUnion, ThemeProp | undefined> = {
  default: undefined,
  success: undefined,
  info: undefined,
  warning: undefined,
  error: undefined,
};

export type PaperToastContainerProps = {
  variant?: SnackbarVariantUnion;
  children?: React.ReactNode;
};

export const PaperToastContainer: React.FC<PaperToastContainerProps> = memo(
  ({ variant, children }) => {
    const theme = useTheme();
    const [snackbars, setSnackbars] = useState<Record<string, SnackbarModel>>({});
    const key = Date.now();
    useEffect(() => {
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
    }, [key]);

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

    const snackbarThemes = useMemo<
      Record<SnackbarTypeUnion, ThemeProp | undefined>
    >(() => {
      switch (variant) {
        case 'outlined':
          return {
            default: undefined,
            success: {
              colors: {
                inverseOnSurface: theme.colors.primary,
              },
            },
            info: {
              colors: {
                inverseOnSurface: theme.colors.secondary,
              },
            },
            warning: {
              colors: {
                inverseOnSurface: theme.colors.tertiary,
              },
            },
            error: {
              colors: {
                inverseOnSurface: theme.colors.error,
              },
            },
          };

        case 'contained':
          return {
            default: undefined,
            success: {
              colors: {
                inverseOnSurface: theme.colors.primary,
                inverseSurface: theme.colors.primaryContainer,
              },
            },
            info: {
              colors: {
                inverseOnSurface: theme.colors.secondary,
                inverseSurface: theme.colors.secondaryContainer,
              },
            },
            warning: {
              colors: {
                inverseOnSurface: theme.colors.tertiary,
                inverseSurface: theme.colors.tertiaryContainer,
              },
            },
            error: {
              colors: {
                inverseOnSurface: theme.colors.error,
                inverseSurface: theme.colors.errorContainer,
              },
            },
          };

        default:
          return defaultThemes;
      }
    }, [variant, theme]);

    const snackbarsJsx = useMemo(
      () =>
        Object.values(snackbars).map(snackbar => (
          <Snackbar
            key={snackbar.id}
            id={snackbar.id}
            visible={snackbar.visible}
            action={snackbar.action}
            theme={snackbarThemes[snackbar.type ?? 'default']}
            style={{ borderColor: 'red', borderWidth: 2 }}
            onDismiss={() => {
              onDismiss(snackbar.id);
              snackbar.onDismiss?.();
            }}
          >
            {snackbar.message}
          </Snackbar>
        )),
      [onDismiss, snackbarThemes, snackbars]
    );

    return (
      <>
        {children}
        {snackbarsJsx}
      </>
    );
  }
);
