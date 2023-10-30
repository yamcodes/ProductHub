import { AppProvider } from './providers/AppProvider';
import { router } from '~/routes';
import { RouterProvider } from '@tanstack/react-router';

// Create the app by enhancing the router with HOCs
// export const App = withProviders(() => <RouterProvider router={router} />);
export const App = () => (
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);
