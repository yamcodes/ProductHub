import { ComponentType } from 'react';

export type UnaryFunction<Arg, Result> = (arg: Arg) => Result;

export interface HOC<TInner, TOuter> {
  (component: ComponentType<TInner>): ComponentType<TOuter>;
}
