import { FC, ReactElement } from 'react';
import { withProviders } from './withProviders';

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
