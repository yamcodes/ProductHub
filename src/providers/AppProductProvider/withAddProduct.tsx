import { FunctionComponent } from 'react';
import { AddProductProvider } from '..';

export const withAddProduct = (Component: FunctionComponent) => {
  return () => (
    <AddProductProvider>
      <Component />
    </AddProductProvider>
  );
};
