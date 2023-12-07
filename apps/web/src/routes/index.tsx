import {
  Outlet,
  RootRoute,
  Route,
  Router,
  lazyRouteComponent,
} from '@tanstack/react-router';
import { lazy } from 'react';
import { MainLayout } from '@/components';

// Define Devtools (only for development)
/* eslint-disable react-refresh/only-export-components -- This is a dev-only component */
const TanStackRouterDevtools =
  import.meta.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(async () => {
        const { TanStackRouterDevtools } = await import(
          '@tanstack/router-devtools'
        );
        return { default: TanStackRouterDevtools };
      });

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
  component: lazyRouteComponent(
    () => import('@/features/products'),
    'Products',
  ),
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: lazyRouteComponent(() => import('@/features/misc'), 'About'),
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
