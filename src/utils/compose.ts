import { ComponentType } from 'react';
import { HOC, UnaryFunction } from '~/types';

export function compose<TInner, TOuter>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...functions: UnaryFunction<any, any>[]
): HOC<TInner, TOuter> {
  return (component: ComponentType<TInner>): ComponentType<TOuter> => {
    return functions.reduceRight(
      (acc, fn) => fn(acc),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component as any,
    ) as ComponentType<TOuter>;
  };
}
