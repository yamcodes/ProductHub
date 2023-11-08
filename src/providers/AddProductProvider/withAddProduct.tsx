import { HOC } from '~/types';
import { AddProductProvider } from '.';

export const withAddProduct: HOC = (Component) => () => (
  <AddProductProvider>
    <Component />
  </AddProductProvider>
);
