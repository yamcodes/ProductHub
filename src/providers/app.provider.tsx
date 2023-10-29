import { FC, ReactElement } from 'react';
import { compose } from '~/shared/lib';
import { withAddProductMutation } from './add-product-mutation.provider';
import { withQueryClient } from './query-client.provider';
import { withSuspense } from './suspense.provider';

// export all providers as a single HOC

/**
 * HOC for all providers in the app
 */
const withProviders = compose(
  withSuspense,
  withQueryClient,
  withAddProductMutation,
);

// export the AppProvider component

interface AppProviderProps {
  children: ReactElement;
}

/**
 * Provider for all providers in the app
 */
export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const EnhancedApp = withProviders(() => <>{children}</>);
  return <EnhancedApp />;
};
