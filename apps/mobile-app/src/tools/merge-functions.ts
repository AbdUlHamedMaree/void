/* eslint-disable @typescript-eslint/no-explicit-any */

export const mergeFunctions =
  <Fns extends (((...args: any[]) => any) | undefined)[]>(...fns: Fns) =>
  (
    ...args: Parameters<Exclude<Fns[number], undefined>>
  ): ReturnType<Exclude<Fns[number], undefined>> => {
    return fns.map(fn => fn?.(...args))[0];
  };
