import { UnaryFunction } from '~/types';

export const compose = <T>(
  fn1: UnaryFunction<T, T>,
  ...fns: UnaryFunction<T, T>[]
) => fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)), fn1);
