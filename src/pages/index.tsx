import { Outlet, Link, Router, Route, RootRoute } from '@tanstack/react-router';
import About from './about';
import Home from './home';

// Create a root route
const rootRoute = new RootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
}

// Create an index route
const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

// Create an about route
const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

// Create the route tree using the routes
const routeTree = rootRoute.addChildren([homeRoute, aboutRoute]);

// Create the router using the route tree
export const router = new Router({
  routeTree,
});

// Register the router for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
