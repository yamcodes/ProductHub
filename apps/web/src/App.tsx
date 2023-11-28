import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/routes';
import { AppProvider, providers } from './providers';

// Create the app by enhancing the router with HOCs
export const App = () => (
  <AppProvider providers={providers}>
    <RouterProvider router={router} />
  </AppProvider>
);
