import { createContext } from 'react';
import { useProducts } from '~/entities/products';

export const AddProductContext = createContext<
  ReturnType<typeof useProducts>['createMutation'] | undefined
>(undefined);
