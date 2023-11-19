// TODO: move away from utils into a more appropriate folder

import { Link } from '@tanstack/react-router';
import { ComponentProps, JSX } from 'react';
import { Icon } from '~/lib/phosphor';

export type TabPathname = ComponentProps<typeof Link>['to'];

export interface TabInfo {
  name: string;
  pathname: TabPathname;
  icon?: JSX.Element;
}

export const tabs: TabInfo[] = [
  {
    name: 'Home',
    pathname: '/',
    icon: <Icon.House />,
  },
  {
    name: 'About',
    pathname: '/about',
    icon: <Icon.Info />,
  },
];

export const getTabIndex = (pathname: TabPathname) =>
  tabs.findIndex((tab) => tab.pathname === pathname);
