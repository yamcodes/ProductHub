import { FC, ReactElement } from 'react';
import { compose } from '~/shared/lib';
import { withAddProductProvider } from './AddProductProvider';
import { withQueryClient } from './QueryClientProvider';
import { withSuspense } from './Suspense';

// export all providers as a single HOC

/**
 * HOC for all providers in the app
 */
const withProviders = compose(
  withSuspense,
  withQueryClient,
  withAddProductProvider,
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
