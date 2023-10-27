// HOC for AddProductProvider
// TODO: Reconsider this, it's not scalable

import { FunctionComponent } from 'react';
import { AddProductProvider } from '~/features/add-product';

const withAddProductMutation = (Component: FunctionComponent) => {
  return () => (
    <AddProductProvider>
      <Component />
    </AddProductProvider>
  );
};

export default withAddProductMutation;
withAddProductMutation;
