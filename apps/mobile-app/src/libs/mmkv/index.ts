import { createStorage } from './create-storage';

export const storage = {
  lang: createStorage<'en' | 'ar'>('lang'),
  accessToken: createStorage<string>('access-token'),
  refreshToken: createStorage<string>('refresh-token'),
};
