import { ComponentType } from 'react';

type UnaryFunction<Arg, Result> = (arg: Arg) => Result;

export interface HOC<TInner, TOuter> {
  (component: ComponentType<TInner>): ComponentType<TOuter>;
}

export function compose<TInner, TOuter>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...functions: UnaryFunction<any, any>[]
): HOC<TInner, TOuter> {
  return (component: ComponentType<TInner>): ComponentType<TOuter> => {
    return functions.reduce(
      (acc, fn) => fn(acc),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component as any,
    ) as ComponentType<TOuter>;
  };
}
