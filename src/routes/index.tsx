import { Outlet, RootRoute, Route, Router } from '@tanstack/react-router';
import { lazy } from 'react';
import { lazyImport } from '~/utils/lazyImport';

const { About } = lazyImport(() => import('~/features/misc'), 'About');
const { Products } = lazyImport(
  () => import('~/features/products'),
  'Products',
);

const { MainLayout } = lazyImport(() => import('~/components'), 'MainLayout');
// Define Devtools (only for development)
/* eslint-disable react-refresh/only-export-components -- This is a dev-only component */
const TanStackRouterDevtools =
  import.meta.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

function Root() {
  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <TanStackRouterDevtools />
    </>
  );
}

const rootRoute = new RootRoute({
  component: Root,
});

const productsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Products,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const routeTree = rootRoute.addChildren([productsRoute, aboutRoute]);

export const router = new Router({
  routeTree,
});

// Register the router for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
