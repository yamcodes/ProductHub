import { FC, PropsWithChildren } from 'react';
import { withProviders } from './withProviders';

/**
 * Provider for all providers in the app
 */
export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const EnhancedApp = withProviders(() => <>{children}</>);
  return <EnhancedApp />;
};
