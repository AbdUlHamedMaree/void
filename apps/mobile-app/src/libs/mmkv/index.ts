import { createStorage } from './create-storage';

export const storage = {
  lang: createStorage<'en' | 'ar'>('en'),
};
