import { FC, PropsWithChildren } from 'react';
import { withProviders } from './withProviders';
import { HOC } from '@/types';

interface Props extends PropsWithChildren {
  providers: HOC[];
}

/**
 * Provider for all providers in the app
 */
export const AppProvider: FC<Props> = ({ providers, children }) => {
  const EnhancedApp = withProviders(() => <>{children}</>, providers);
  return <EnhancedApp />;
};
