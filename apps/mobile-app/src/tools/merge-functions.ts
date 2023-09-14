/* eslint-disable @typescript-eslint/no-explicit-any */

export const mergeFunctions =
  <Fns extends ((...args: any[]) => any)[]>(...fns: Fns) =>
  (...args: Parameters<Fns[number]>): ReturnType<Fns[number]> => {
    return fns.map(fn => fn(...args))[0];
  };
