import { atomWithStorage } from 'jotai/utils';

export const isWelcomeStepperSkippedAtom = atomWithStorage<boolean>(
  'is-welcome-stepper-skipped',
  false
);
