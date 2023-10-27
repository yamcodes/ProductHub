import { createContext } from 'react';
import { useProducts } from '~/entities/products';

export default createContext<
  ReturnType<typeof useProducts>['createMutation'] | undefined
>(undefined);
