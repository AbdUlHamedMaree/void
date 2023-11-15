import { CreateStorage } from '$libs/mmkv/create-storage';
import { useState } from 'react';
import { useNewStateSetter } from './use-new-state-setter';

export const useMMKVState = <T, F = null>(api: ReturnType<CreateStorage<T, F>>) => {
  const [state, setState] = useState<T | F>(api.get());

  const setter = useNewStateSetter(setState, api.set);

  return [state, setter] as const;
};
