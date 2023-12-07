import { FC, PropsWithChildren } from 'react';
import { Icons } from '@/lib/phosphor';
import { Tab, TabType } from '..';
import { Content } from './Content';
import { Header } from './Header';

const tabs: TabType[] = [
  {
    name: 'Home',
    pathname: '/',
    icon: <Icons.House />,
  },
  {
    name: 'About',
    pathname: '/about',
    icon: <Icons.Info />,
  },
];

/**
 * Get the index of the tab that matches the current pathname.
 * @returns The index of the tab that matches the current pathname, or -1 if no tab matches.
 */
const getTabIndex = () =>
  tabs.findIndex((tab) => tab.pathname === location.pathname);

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Tab.Group selectedIndex={getTabIndex()}>
      <Header>
        <Tab.List className="flex items-center space-x-2">
          {tabs.map((tab) => (
            <Tab
              name={tab.name}
              icon={tab.icon}
              key={tab.pathname}
              pathname={tab.pathname}
            />
          ))}
        </Tab.List>
      </Header>
      <Content>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={tab.pathname}>{children}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Content>
    </Tab.Group>
  );
};
