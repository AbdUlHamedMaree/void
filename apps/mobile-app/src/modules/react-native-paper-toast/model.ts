import React from 'react';
import { SnackbarProps } from 'react-native-paper';

export type SnackbarTypeUnion = 'default' | 'info' | 'success' | 'warning' | 'error';
export type SnackbarVariantUnion = 'outlined' | 'contained';

export type SnackbarModel = {
  id: string;
  message: React.ReactNode;
  type?: SnackbarTypeUnion;
  variant?: SnackbarVariantUnion;
  visible: boolean;
} & Partial<
  Pick<
    SnackbarProps,
    | 'action'
    | 'icon'
    | 'onIconPress'
    | 'rippleColor'
    | 'iconAccessibilityLabel'
    | 'duration'
    | 'onDismiss'
    | 'elevation'
    | 'testID'
    | 'theme'
  >
>;

export type ToastOptionsModel = Omit<SnackbarModel, 'visible' | 'id'>;
export type ToastOptionsWithoutMessageModel = Omit<ToastOptionsModel, 'message'>;

export type BaseToastFn = {
  (message: React.ReactNode, options?: ToastOptionsWithoutMessageModel): void;
  (options: ToastOptionsModel): void;
};

export type ToastFn = Record<SnackbarTypeUnion, BaseToastFn> & BaseToastFn;
