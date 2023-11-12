import { Link, Outlet, RootRoute, Route, Router } from '@tanstack/react-router';
import { lazy } from 'react';
import { About } from '~/features/misc';
import { Products } from '~/features/products';
import { Tab } from '~/components';
import { getTabIndex, tabs } from '~/utils/tabs';

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
    <div className="p-4">
      <Tab.Group selectedIndex={getTabIndex(location.pathname)}>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="cursor-pointer select-none from-pink-400 to-purple-500 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent"
          >
            ProductHub
          </Link>
          <Tab.List>
            {tabs.map((tab) => (
              <Link to={tab.pathname} key={tab.pathname}>
                <Tab>{tab.name}</Tab>
              </Link>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={tab.pathname}>
              <Outlet />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <TanStackRouterDevtools />
    </div>
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
