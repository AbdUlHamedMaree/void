import { ToastOptionsModel } from '$modules/react-native-paper-toast/model';

export type ParamListWithBase<T = unknown> = {
  toast?: ToastOptionsModel;
} & T;
