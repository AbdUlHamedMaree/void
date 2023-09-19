import { produce } from 'immer';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Snackbar } from 'react-native-paper';
import { SnackbarModel } from './model';
import { EmitterApi } from './event-emitter';

export type PaperToastContainerProps = {
  children?: React.ReactNode;
};

export const PaperToastContainer: React.FC<PaperToastContainerProps> = memo(
  ({ children }) => {
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

    const snackbarsJsx = useMemo(
      () =>
        Object.values(snackbars).map(snackbar => (
          <Snackbar
            key={snackbar.id}
            id={snackbar.id}
            visible={snackbar.visible}
            onDismiss={() => {
              onDismiss(snackbar.id);
              snackbar.onDismiss?.();
            }}
            action={snackbar.action}
          >
            {snackbar.message}
          </Snackbar>
        )),
      [onDismiss, snackbars]
    );

    return (
      <>
        {children}
        {snackbarsJsx}
      </>
    );
  }
);
