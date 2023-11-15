import { AvailableLanguagesUnion } from '$models/available-languages';
import { createStorage } from './create-storage';

export const storage = {
  lang: createStorage<AvailableLanguagesUnion, AvailableLanguagesUnion>('lang', 'en'),
  accessToken: createStorage<string>('access-token'),
  refreshToken: createStorage<string>('refresh-token'),
};
