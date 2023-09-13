import { appStorage } from '$libs/mmkv/app-storage';
import { atomWithStorage } from 'jotai/utils';
import { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jsonStorage: SyncStorage<any> = {
  getItem: appStorage.get,
  setItem: appStorage.set,
  removeItem: appStorage.delete,
};

export const atomWithMMKV = <T>(key: string, initialValue: T) =>
  atomWithStorage<T>(key, initialValue, jsonStorage, { unstable_getOnInit: true });
