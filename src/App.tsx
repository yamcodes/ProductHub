import { RouterProvider } from '@tanstack/react-router';
import { router } from '~/routes';
import { AppProvider } from './providers';
import { withSuspense } from './providers/Suspense';
import { withQueryClient } from './providers/QueryClientProvider';
import { withIcons } from './providers/Icons';

// Create the app by enhancing the router with HOCs
export const App = () => (
  <AppProvider providers={[withSuspense, withQueryClient, withIcons]}>
    <RouterProvider router={router} />
  </AppProvider>
);
