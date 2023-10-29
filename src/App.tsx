import { AppProvider } from './providers/app.provider';
import { router } from '~/pages';
import { RouterProvider } from '@tanstack/react-router';

// Create the app by enhancing the router with HOCs
// export const App = withProviders(() => <RouterProvider router={router} />);
export const App = () => (
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);
