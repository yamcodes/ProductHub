// export all providers as a single HOC

import { compose } from '~/utils/compose';
import { withSuspense } from '../Suspense';
import { withQueryClient } from '../QueryClientProvider';
import { withAddProduct } from '../AddProductProvider';

/**
 * HOC for all providers in the app
 */
export const withProviders = compose(
  withSuspense,
  withQueryClient,
  withAddProduct,
);
