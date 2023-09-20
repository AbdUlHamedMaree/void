import { atomWithMMKV } from '$libs/jotai/atom-with-mmkv';

export type UserModel = {
  id: string;
  fullName: string;
  email: string;
};

export const userAtom = atomWithMMKV<UserModel | null>('user', null);
