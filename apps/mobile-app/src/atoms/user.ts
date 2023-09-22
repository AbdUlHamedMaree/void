import { atomWithMMKV } from '$libs/jotai/atom-with-mmkv';

export type UserModel = {
  id: string;
  phone: string;
};

export const userAtom = atomWithMMKV<UserModel | null>('user', null);
