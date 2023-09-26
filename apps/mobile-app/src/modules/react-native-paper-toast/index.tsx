import React from 'react';
import {
  BaseToastFn,
  ToastFn,
  ToastOptionsModel,
  ToastOptionsWithoutMessageModel,
  SnackbarTypeUnion,
} from './model';
import { EmitterApi } from './event-emitter';
import { PaperToastContainer } from './container';

const pushToast = (toast: ToastOptionsModel) => {
  EmitterApi.addSnackbar({
    ...toast,
    id: Date.now() + '',
    message: toast.message ?? '',
    visible: false,
  });
};

const createTypedToastFn =
  (type: SnackbarTypeUnion): BaseToastFn =>
  (messageOrOptions, options?: ToastOptionsWithoutMessageModel) => {
    if (typeof (messageOrOptions as ToastOptionsModel)?.message === 'string')
      return pushToast({ type, ...(messageOrOptions as ToastOptionsModel) });

    return pushToast({
      type,
      ...options,
      message: messageOrOptions as React.ReactNode,
    });
  };

export const toast = createTypedToastFn('default') as ToastFn;
toast.default = createTypedToastFn('default');
toast.success = createTypedToastFn('success');
toast.info = createTypedToastFn('info');
toast.warning = createTypedToastFn('warning');
toast.error = createTypedToastFn('error');

export { PaperToastContainer };
