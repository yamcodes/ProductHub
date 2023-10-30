// HOC for AddProductProvider
// TODO: Reconsider this, it's not scalable

import { ReactNode } from 'react';
import { AddProductContext, useProducts } from '~/features/products';

export const AddProductProvider = ({ children }: { children: ReactNode }) => {
  const { createMutation } = useProducts();
  return (
    <AddProductContext.Provider value={createMutation}>
      {children}
    </AddProductContext.Provider>
  );
};
