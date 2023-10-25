import { lazy } from 'react';
import { Outlet, Link, Router, Route, RootRoute } from '@tanstack/react-router';
import About from './about';
import { Tab } from '@headlessui/react';
import Home from './home';

// Define Devtools (only for development)
/* eslint-disable react-refresh/only-export-components -- This is a dev-only component */
const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

const rootRoute = new RootRoute({
  component: () => (
    <>
      <div className="flex items-center flex-col">
        <div className="w-full">
          <div className="flex flex-auto p-4">
            <Link
              to="/"
              className="text-xl font-bold mx-6 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent cursor-pointer select-none
            "
            >
              <div>ProductHub</div>
            </Link>
            <Tab.Group>
              <Tab.List>
                <Link to="/">
                  <Tab>Home</Tab>
                </Link>
                <Link to="/about">
                  <Tab>About</Tab>
                </Link>
              </Tab.List>
            </Tab.Group>
          </div>
        </div>
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </>
  ),
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const routeTree = rootRoute.addChildren([homeRoute, aboutRoute]);

export const router = new Router({
  routeTree,
});

// Register the router for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
