import { ComponentType, FC } from 'react';

export type UnaryFunction<Arg, Result> = (arg: Arg) => Result;

export interface HOC {
  (component: ComponentType): FC;
}
type WrapInObject<T> = T extends any ? { key: T } : never;
type Unwrap<T> = T extends { key: any } ? T['key'] : never;

export type ExplicitUnion<T> = Unwrap<WrapInObject<T>>;
