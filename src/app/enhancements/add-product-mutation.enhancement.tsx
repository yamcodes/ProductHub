// HOC for AddProductProvider
// TODO: Reconsider this, it's not scalable

import { FunctionComponent } from 'react';
import { AddProductProvider } from '~/features/add-product';

export const withAddProductMutation = (Component: FunctionComponent) => {
  return () => (
    <AddProductProvider>
      <Component />
    </AddProductProvider>
  );
};
