// TODO: Break this file down into smaller components by FSD

import { Link, Outlet } from '@tanstack/react-router';
import { lazy } from 'react';
import { Tab, useTabs } from '~/shared/ui';

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

export function Root() {
  const { selectedTabIndex, handleTabChange, tabs } = useTabs();
  return (
    <div className="flex items-center flex-col">
      <div className="w-full">
        <div className="flex flex-auto p-4">
          <Link
            to="/"
            className="text-xl font-bold mx-6 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent cursor-pointer select-none
        "
          >
            ProductHub
          </Link>
          <Tab.Group
            selectedIndex={selectedTabIndex}
            onChange={handleTabChange}
          >
            {tabs.map((tab) => (
              <Link to={tab.pathname}>
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
