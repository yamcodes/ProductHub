import { enhance } from './enhancements';
import { router } from '~/pages';
import { RouterProvider } from '@tanstack/react-router';

function App() {
  return <RouterProvider router={router} />;
}

const EnhancedApp = enhance(App);

export default EnhancedApp;
