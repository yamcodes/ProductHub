import './index.css';
import { enhance } from './enhancements';
import { router } from '~/pages';
import { RouterProvider } from '@tanstack/react-router';

function App() {
  return <RouterProvider router={router} />;
}

export default enhance(App);
