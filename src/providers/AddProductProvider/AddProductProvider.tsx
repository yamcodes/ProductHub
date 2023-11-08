// HOC for AddProductProvider
// TODO: Reconsider this, it's not scalable

import { FC, PropsWithChildren } from 'react';
import { AddProductContext, useProducts } from '~/features/products';

export const AddProductProvider: FC<PropsWithChildren> = ({ children }) => {
  const { createMutation } = useProducts();
  return (
    <AddProductContext.Provider value={createMutation}>
      {children}
    </AddProductContext.Provider>
  );
};
