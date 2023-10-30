// HOC for AddProductProvider
// TODO: Reconsider this, it's not scalable

import { FunctionComponent, ReactNode } from 'react';
import { AddProductContext, useProducts } from '~/features/products';

export const AddProductProvider = ({ children }: { children: ReactNode }) => {
  const { createMutation } = useProducts();
  return (
    <AddProductContext.Provider value={createMutation}>
      {children}
    </AddProductContext.Provider>
  );
};

export const withAddProductProvider = (Component: FunctionComponent) => {
  return () => (
    <AddProductProvider>
      <Component />
    </AddProductProvider>
  );
};
