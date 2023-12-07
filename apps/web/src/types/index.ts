import { ComponentType, FC } from 'react';

export type UnaryFunction<Arg, Result> = (arg: Arg) => Result;

export interface HOC {
  (component: ComponentType): FC;
}
