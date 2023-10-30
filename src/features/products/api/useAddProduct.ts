import { createContext, useContext } from 'react';
import { useProducts } from '.';

export const AddProductContext = createContext<
  ReturnType<typeof useProducts>['createMutation'] | undefined
>(undefined);

export const useAddProduct = () => {
  const context = useContext(AddProductContext);

  if (context === undefined)
    throw new Error('useAddProduct must be used within a AddProductProvider');

  return context;
};
