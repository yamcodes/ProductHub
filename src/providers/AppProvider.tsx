import { FC, ReactElement } from 'react';
import { compose } from '~/utils/utils';
import { withAddProduct } from './AppProductProvider';
import { withQueryClient } from './QueryClientProvider';
import { withSuspense } from './Suspense';

// export all providers as a single HOC

/**
 * HOC for all providers in the app
 */
const withProviders = compose(withSuspense, withQueryClient, withAddProduct);

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
