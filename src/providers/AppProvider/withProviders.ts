// export all providers as a single HOC

import { compose } from '~/utils/compose';
import { withSuspense } from '../Suspense';
import { withQueryClient } from '../QueryClientProvider';
import { withIcons } from '../Icons';
import { HOC } from '~/types';
/**
 * HOC for all providers in the app
 */
export const withProviders = <HOC>(
  compose(withIcons, withSuspense, withQueryClient)
);
