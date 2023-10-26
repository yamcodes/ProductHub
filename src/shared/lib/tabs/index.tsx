import { Link } from '@tanstack/react-router';
import { ComponentProps } from 'react';

export type TabPathname = ComponentProps<typeof Link>['to'];

export interface TabInfo {
  name: string;
  pathname: TabPathname;
}

export const tabs: TabInfo[] = [
  {
    name: 'Home',
    pathname: '/',
  },
  {
    name: 'About',
    pathname: '/about',
  },
];

export const getTabIndex = (pathname: TabPathname) =>
  tabs.findIndex((tab) => tab.pathname === pathname);
