import { useProducts } from '~/entities/products';
import { ReactNode } from 'react';
import { AddProductContext } from './add-product.context';

export const AddProductProvider = ({ children }: { children: ReactNode }) => {
  const { createMutation } = useProducts();
  return (
    <AddProductContext.Provider value={createMutation}>
      {children}
    </AddProductContext.Provider>
  );
};
