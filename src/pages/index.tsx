import { Link, Outlet, RootRoute, Route, Router } from '@tanstack/react-router';
import About from './about';
import Home from './home';
import { lazy } from 'react';
import { getTabIndex, tabs } from '~/shared/lib';
import { Tab } from '~/shared/ui';

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

function Root() {
  return (
    <div className="flex items-center flex-col">
      <div className="w-full">
        <div className="p-4">
          <Link
            to="/"
            className="text-xl font-bold mx-6 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent cursor-pointer select-none
        "
          >
            ProductHub
          </Link>
          <Tab.Group selectedIndex={getTabIndex(location.pathname)}>
            {tabs.map((tab) => (
              <Link to={tab.pathname} key={tab.pathname}>
                <Tab>{tab.name}</Tab>
              </Link>
            ))}
          </Tab.Group>
        </div>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}

const rootRoute = new RootRoute({
  component: Root,
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
