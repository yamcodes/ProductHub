import { RouterProvider } from '@tanstack/react-router';
import { router } from '~/routes';
import { withProviders } from './providers';

// Create the app by enhancing the router with HOCs
// export const App = withProviders(() => <RouterProvider router={router} />);
export const App = withProviders(() => <RouterProvider router={router} />);
