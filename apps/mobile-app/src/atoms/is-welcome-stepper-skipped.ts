import { atomWithMMKV } from '$libs/jotai/atom-with-mmkv';

export const isWelcomeStepperSkippedAtom = atomWithMMKV<boolean>(
  'is-welcome-stepper-skipped',
  false
);
