import withQueryClient from './query-client.enhancement';
import withSuspense from './suspense.enhancement';
import withAddProductMutation from './add-product-mutation.enhancement';
import { compose } from 'recompose';

export const enhance = compose(
  withSuspense,
  withQueryClient,
  withAddProductMutation,
);
