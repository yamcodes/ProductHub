import { RootRoute, Route, Router } from '@tanstack/react-router';
import About from './about';
import Home from './home';
import { Root } from './root';

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
