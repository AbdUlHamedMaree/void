export type RequiredKeys<T, Keys extends keyof T> = Omit<T, Keys> & {
  [K in Keys]-?: T[K];
};
