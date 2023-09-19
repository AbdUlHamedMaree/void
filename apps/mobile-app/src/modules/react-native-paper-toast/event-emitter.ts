import { SnackbarModel } from './model';

export const EmitterApi = {
  onSnackbar: [] as [(toast: SnackbarModel) => void, number][],
  addSnackbar: (toast: SnackbarModel) => {
    EmitterApi.onSnackbar.at(-1)?.[0]?.(toast);
  },
};
