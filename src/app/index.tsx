import { enhance } from './enhancements';
import { router } from '~/pages';
import { RouterProvider } from '@tanstack/react-router';

// Create the app by enhancing the router with HOCs
export const App = enhance(() => <RouterProvider router={router} />);
